import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import apiService from 'src/api/axiosInstance'

const extractErrorMessage = (error, defaultMessage) => {
  if (!error.response) return error.message || defaultMessage

  const { data } = error.response
  if (data?.detail) return data.detail
  if (data?.error) {
    const errorString = typeof data.error === 'object' ? JSON.stringify(data.error) : data.error
    const match = /ErrorDetail\(string='(.*?)'/.exec(errorString)
    return match?.[1] || errorString
  }
  return defaultMessage
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    onBoardCount: localStorage.getItem('onBoardCount') || '0',
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
    setTokens(tokens) {
      this.accessToken = tokens.access
      this.refreshToken = tokens.refresh
      localStorage.setItem('accessToken', tokens.access)
      localStorage.setItem('refreshToken', tokens.refresh)
    },

    saveUser(tokens, userDetails) {
      this.setTokens(tokens)
      this.isAuthenticated = true

      Object.entries(userDetails).forEach(([key, value]) => {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          this[key] = value
          localStorage.setItem(key, value)
        }
      })
    },

    handleAuthSuccess(response, successMessage = 'Login successful') {
      const { tokens, data: userData } = response.data
      this.saveUser(tokens, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        is_phone_verified: userData.is_phone_verified,
      })

      Notify.create({ type: 'positive', message: successMessage })
      this.router.push('/pages/home')
    },

    handleRedirectResponse(response) {
      const redirectUrl = response.data.redirect_url
      Notify.create({
        type: 'negative',
        message: response.data.message || 'Redirection required.',
      })
      if (redirectUrl) this.router.push(redirectUrl)
    },

    async handleAuthError(error, defaultMessage = 'An error occurred during authentication') {
      if (error.response?.status === 307) {
        this.handleRedirectResponse(error.response)
      } else {
        const errorMessage = extractErrorMessage(error, defaultMessage)
        Notify.create({ type: 'negative', message: errorMessage })
      }
    },

    async socialLogin(response) {
      try {
        if (!response.credential) {
          console.log('No credential found in response:', response)
          const res = await apiService.googleLogin({ id_token: response.replace(/^"|"$/g, '') })
          if (res.status === 200) {
            this.handleAuthSuccess(res)
          }
        } else {
          console.log('Credential found in response:', response.credential)
          const res = await apiService.googleLogin({ id_token: response.credential })
          if (res.status === 200) {
            this.handleAuthSuccess(res)
          }
        }
      } catch (error) {
        await this.handleAuthError(error)
      }
    },

    async logins(credentials, useAlternativeResponse = false) {
      try {
        const res = await apiService.login(credentials)
        if (res.status !== 200) return

        if (useAlternativeResponse) {
          const userDetails = {
            first_name: res.data.data.first_name,
            last_name: res.data.data.last_name,
            is_phone_verified: res.data.data.is_phone_verified,
          }
          this.saveUser(res.data.tokens.tokens, userDetails)
        } else {
          this.first_name = res.data.data.first_name
          this.last_name = res.data.data.last_name
          this.is_phone_verified = res.data.data.is_phone_verified
          this.isAuthenticated = true
          this.setTokens(res.data.data.tokens.tokens)
        }

        Notify.create({ type: 'positive', message: 'Login successful' })
        this.router.push('/pages/home')
      } catch (error) {
        await this.handleAuthError(error)
      }
    },

    async register(data) {
      this.isLoading = true
      try {
        const response = await apiService.register(data)
        if (response.status === 201) {
          this.router.push('/reg/email-verify')
          Notify.create({
            type: 'positive',
            message: 'Enter the One Time Password to verify email',
          })
        }
      } catch (error) {
        const errorMessage = extractErrorMessage(error, 'An error occurred during registration')
        Notify.create({ type: 'negative', message: errorMessage })
      } finally {
        this.isLoading = false
      }
    },

    async handleVerificationFlow(apiCall, data, successPath, successMessage) {
      this.isLoading = true
      try {
        const response = await apiCall(data)
        if (response.status === 200) {
          this.router.push(successPath)
          Notify.create({ type: 'positive', message: successMessage })
          return response
        }
      } catch (error) {
        const errorMessage = extractErrorMessage(error, 'An error occurred during verification')
        Notify.create({ type: 'negative', message: errorMessage })
      } finally {
        this.isLoading = false
      }
    },

    async EmailOTP(data) {
      const response = await this.handleVerificationFlow(
        apiService.verifyEmail,
        data,
        '/reg/phone-number',
        'Proceed to enter phone number',
      )
      if (response) {
        this.setTokens(response.data.tokens)
        localStorage.setItem('is_phone_verified', 'false')
      }
    },

    async VerifyPhone(data) {
      await this.handleVerificationFlow(
        apiService.VerifyPhoneNumber,
        data,
        '/reg/phone-number-verify',
        'Enter the One Time Password to verify phone',
      )
    },

    async PhoneVerifyOTP(data) {
      try {
        const res = await apiService.VerifyPhoneNumberOTP(data)
        if (res.status === 200) {
          localStorage.removeItem('phone_number')
          localStorage.removeItem('email_address')
          this.first_name = res.data.first_name
          this.last_name = res.data.last_name
          this.isAuthenticated = true
          this.setTokens(res.data.tokens)

          Notify.create({
            type: 'positive',
            message: res.data.message || 'Registration Successful',
          })
          this.router.push('/pages/home')
        }
      } catch (error) {
        const errorMessage = extractErrorMessage(error, 'An error occurred during verification')
        Notify.create({ type: 'negative', message: errorMessage })
      }
    },

    async OTPResend(data) {
      this.isLoading = true
      try {
        const response = await apiService.generateRegister(data)
        if (response.status === 200) {
          Notify.create({ type: 'positive', message: 'OTP has been sent' })
        }
      } catch (error) {
        const errorMessage = extractErrorMessage(error, 'An error occurred during OTP resend')
        Notify.create({ type: 'negative', message: errorMessage })
      } finally {
        this.isLoading = false
      }
    },

    async passwordResetFlow(apiCall, data, successPath, successMessage) {
      this.isLoading = true
      try {
        const response = await apiCall(data)
        if (response.status === 200) {
          this.router.push(successPath)
          Notify.create({ type: 'positive', message: successMessage })
        }
      } catch (error) {
        const errorMessage = extractErrorMessage(error, 'An error occurred during password reset')
        Notify.create({ type: 'negative', message: errorMessage })
      } finally {
        this.isLoading = false
      }
    },

    async forgotEmail(data) {
      await this.passwordResetFlow(
        apiService.forgottenEmail,
        data,
        '/reg/confirm-password',
        'Password reset instructions sent',
      )
    },

    async ConfirmPassword(data) {
      await this.passwordResetFlow(
        apiService.confirmPassword,
        data,
        '/auth/login',
        'Password reset successful',
      )
    },

    async logout() {
      this.isLoading = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const res = await apiService.logout({ refresh_token: refreshToken })
        if (res.status === 204) {
          localStorage.clear()
          this.router.push('/auth/login')
          Notify.create({ type: 'positive', message: 'Logout successful' })
        }
      } catch (error) {
        const errorMessage = extractErrorMessage(error, 'An error occurred during logout')
        Notify.create({ type: 'negative', message: errorMessage })
      } finally {
        this.isLoading = false
      }
    },
  },
})
