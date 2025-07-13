// Refactored Pinia Auth Store
import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import apiService from 'src/api/axiosInstance'

const notify = (type, message) => {
  Notify.create({ type, message })
}

const handleApiError = (e, fallbackMsg = 'An error occurred') => {
  let message = fallbackMsg
  if (e.response?.data?.error) {
    const errorData = e.response.data.error
    const errorStr = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData
    const match = /ErrorDetail\(string='(.*?)'/.exec(errorStr)
    message = match?.[1] || errorData
  } else if (e.response?.data?.detail) {
    message = e.response.data.detail
  } else if (e.message) {
    message = e.message
  }
  notify('negative', message)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    onBoardCount: localStorage.getItem('onBoardCount') || 0,
    first_name: localStorage.getItem('first_name') || '',
    last_name: localStorage.getItem('last_name') || '',
    email: localStorage.getItem('email') || '',
    phone_number: localStorage.getItem('phone_number') || '',
    is_phone_verified: localStorage.getItem('is_phone_verified') || '',
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    shouldCompleteOnboarding: (state) => state.onBoardCount !== 'true',
  },

  actions: {
    setTokens({ access, refresh }) {
      this.accessToken = access
      this.refreshToken = refresh
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    },

    saveUser(tokens, { first_name, last_name }) {
      this.setTokens(tokens)
      Object.assign(this, {
        isAuthenticated: true,
        first_name,
        last_name,
      })
      localStorage.setItem('first_name', first_name)
      localStorage.setItem('last_name', last_name)
    },

    async socialLogin(response) {
      try {
        if (!response.credential) {
          console.log('No credential found in response:', response)
          const res = await apiService.googleLogin({ id_token: response.replace(/^"|"$/g, '') })
          if (res.status === 200) {
            const { first_name, last_name } = res.data.data
            this.saveUser(res.data.data.tokens, { first_name, last_name })
            notify('positive', 'Login successful')
            this.router.push({ path: '/pages/home' })
          }
        } else {
          console.log('Credential found in response:', response.credential)
          const res = await apiService.googleLogin({ id_token: response.credential })
          if (res.status === 200) {
            const { first_name, last_name } = res.data.data
            this.saveUser(res.data.data.tokens, { first_name, last_name })
            notify('positive', 'Login successful')
            this.router.push({ path: '/pages/home' })
          }
        }
      } catch (e) {
        if (e.response?.status === 307) {
          this.setTokens(e.response.data.data.token)
          this.router.push({ path: e.response.data.redirect_url })
          notify('negative', e.response.data.message || 'Redirection required.')
        } else {
          handleApiError(e, 'An error occurred during login.')
        }
      }
    },

    async loginsRem(credentials) {
      try {
        const res = await apiService.login(credentials)
        if (res.status === 200) {
          this.saveUser(res.data.tokens.tokens, res.data.data)
          notify('positive', 'Login successful')
          this.router.push({ path: '/pages/home' })
        }
      } catch (e) {
        if (e.response?.status === 307) {
          notify('negative', e.response.data.detail || 'Redirection required.')
          this.router.push({ path: e.response.data.redirect_url })
        } else {
          handleApiError(e, 'An error occurred during login.')
        }
      }
    },

    async logins(credentials) {
      try {
        const res = await apiService.login(credentials)
        if (res.status === 200) {
          this.saveUser(res.data.data.tokens.tokens, res.data.data)
          notify('positive', 'Login successful')
          this.router.push({ path: '/pages/home' })
        }
      } catch (e) {
        if (e.response?.status === 307) {
          notify('negative', e.response.data.detail || 'Redirection required.')
          this.router.push({ path: e.response.data.redirect_url })
        } else {
          handleApiError(e, 'An error occurred during login.')
        }
      }
    },

    async register(data) {
      this.isLoading = true
      try {
        const res = await apiService.register(data)
        if (res.status === 201) {
          this.router.push({ path: '/reg/email-verify' })
          notify('positive', 'Enter the One Time Password to verify email')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during registration.')
      }
    },

    async EmailOTP(data) {
      this.isLoading = true
      try {
        const res = await apiService.verifyEmail(data)
        if (res.status === 200) {
          this.setTokens(res.data.tokens)
          localStorage.setItem('is_phone_verified', 'false')
          this.router.push({ path: '/reg/phone-number' })
          notify('positive', res.data.message || 'Proceed to enter phone number')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during email verification.')
      }
    },

    async VerifyPhone(data) {
      this.isLoading = true
      try {
        const res = await apiService.VerifyPhoneNumber(data)
        if (res.status === 200) {
          this.router.push({ path: '/reg/phone-number-verify' })
          notify('positive', 'Enter the One Time Password to verify email')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during phone setup.')
      }
    },

    async PhoneVerifyOTP(data) {
      try {
        const res = await apiService.VerifyPhoneNumberOTP(data)
        if (res.status === 200) {
          localStorage.removeItem('phone_number')
          localStorage.removeItem('email_address')
          this.saveUser(res.data.tokens, res.data)
          this.router.push({ path: '/pages/home' })
          notify('positive', res.data.message || 'Registration Successful')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during phone OTP verification.')
      }
    },

    async OTPResend(data) {
      this.isLoading = true
      try {
        const res = await apiService.generateRegister(data)
        if (res.status === 200) {
          notify('positive', 'OTP has been sent')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during OTP resend.')
      }
    },

    async forgotEmail(data) {
      this.isLoading = true
      try {
        const res = await apiService.forgottenEmail(data)
        if (res.status === 200) {
          this.router.push({ path: '/reg/confirm-password' })
          notify('positive', 'Password reset successful')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during email recovery.')
      }
    },

    async ConfirmPassword(data) {
      this.isLoading = true
      try {
        const res = await apiService.confirmPassword(data)
        if (res.status === 200) {
          this.router.push({ path: '/auth/login' })
          notify('positive', 'Password reset successful')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during password reset.')
      }
    },

    async logout() {
      this.isLoading = true
      try {
        const res = await apiService.logout({ refresh_token: this.refreshToken })
        if (res.status === 204) {
          localStorage.clear()
          this.router.push({ path: '/auth/login' })
          notify('positive', 'Logout successful')
        }
      } catch (e) {
        handleApiError(e, 'An error occurred during logout.')
      }
    },
  },
})
