import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import apiService from 'src/api/axiosInstance'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    onBoardCount : localStorage.getItem('onBoardCount') || 0, 
    first_name: localStorage.getItem('first_name') || '',
    last_name: localStorage.getItem('last_name') || '',
    email: localStorage.getItem('email') || '',
    phone_number: localStorage.getItem('phone_number') || '',
    is_phone_verified: localStorage.getItem('is_phone_verified') || '',
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.accessToken
    },
  },

  actions: {
    setTokens(token) {
      this.accessToken = token.access
      this.refreshToken = token.refresh
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
    },

    saveUser(token, userDetails) {
      this.setTokens(token)
      this.isAuthenticated = true
      this.first_name = userDetails.first_name
      this.last_name = userDetails.last_name
      this.is_phone_verified = userDetails.is_phone_verified
      localStorage.setItem('first_name', userDetails.first_name)
      localStorage.setItem('last_name', userDetails.last_name)
      localStorage.setItem('is_phone_verified', userDetails.is_phone_verified)
    },

    async socialLogin(response) {
      try {
        console.log('send_res', response)
        const res = await apiService.googleLogin({
          access_token: response.access_token,
        })
        if (res.status === 200) {
          const userDetails = {
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            phone_number: res.data.phone_number,
          }
          this.saveUser(res.data.tokens.access, userDetails)
          this.refreshToken = res.data.tokens.refresh
          localStorage.setItem('refreshToken', this.refreshToken)
          Notify.create({
            type: 'positive',
            message: 'Login successful',
          })
          this.router.push({ path: '/' })
        }
      } catch (e) {
        const res = e.response
        if (res && res.status === 307) {
          console.log('err res', res)
          const redirectUrl = res.data.redirect_url
          this.setTokens(res.data.data)
          this.router.push({ path: redirectUrl })

          Notify.create({
            type: 'negative',
            message: res.data.message || 'Redirection required.',
          })
        } else {
          let errorMessage = 'An error occurred during login.'
          if (e.response && e.response.data && e.response.data.detail) {
            errorMessage = e.response.data.detail
          } else if (e.message) {
            errorMessage = e.message
          }

          Notify.create({
            type: 'negative',
            message: errorMessage,
          })
        }
      }
    },

    async loginsRem(credentials) {
      try {
        const res = await apiService.login(credentials)
        console.log('res log rem', res)
        if (res.status === 200) {
          const userDetails = {
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            is_phone_verified: res.data.is_phone_verified,
          }
          this.saveUser(res.data.tokens.tokens, userDetails)

          Notify.create({
            type: 'positive',
            message: 'Login successful',
          })
          this.router.push({ path: '/pages/home' })
        }
      } catch (e) {
        const res = e.response
        if (res && res.status === 307) {
          const redirectUrl = res.data.redirect_url

          Notify.create({
            type: 'negative',
            message: res.data.detail || 'Redirection required.',
          })

          if (redirectUrl) {
            this.router.push({ path: redirectUrl })
          }
        } else {
          let errorMessage = 'An error occurred during login.'
          if (e.response && e.response.data && e.response.data.detail) {
            errorMessage = e.response.data.detail
          } else if (e.message) {
            errorMessage = e.message
          }

          Notify.create({
            type: 'negative',
            message: errorMessage,
          })
        }
      }
    },

    async logins(credentials) {
      try {
        const res = await apiService.login(credentials)
        console.log('res log', res)
        if (res.status === 200) {
          this.first_name = res.data.first_name
          this.last_name = res.data.last_name
          this.is_phone_verified = res.data.is_phone_verified
          this.isAuthenticated = true
          this.setTokens(res.data.tokens.tokens)

          Notify.create({
            type: 'positive',
            message: 'Login successful',
          })
          this.router.push({ path: '/pages/home' })
        }
      } catch (e) {
        const res = e.response
        if (res && res.status === 307) {
          const redirectUrl = res.data.redirect_url

          Notify.create({
            type: 'negative',
            message: res.data.detail || 'Redirection required.',
          })

          if (redirectUrl) {
            this.router.push({ path: redirectUrl })
          }
        } else {
          let errorMessage = 'An error occurred during login.'
          if (e.response && e.response.data && e.response.data.detail) {
            errorMessage = e.response.data.detail
          } else if (e.message) {
            errorMessage = e.message
          }

          Notify.create({
            type: 'negative',
            message: errorMessage,
          })
        }
      }
    },

    async register(data) {
      this.isLoading = true
      try {
        const response = await apiService.register(data)
        if (response.status === 201) {
          this.router.push({ path: '/reg/email-verify' })
          Notify.create({
            type: 'positive',
            message: 'Enter the One Time Password to verify email',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during registration.' // Default message

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          const errorData = e.response.data.error

          // Convert error object to string if it's an object
          let errorString = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData

          // Use regular expression to extract the error message within 'ErrorDetail(string=...)'
          let regex = /ErrorDetail\(string='(.*?)'/
          let match = regex.exec(errorString)

          if (match && match[1]) {
            errorMessage = match[1] // Extracted error message
          } else {
            errorMessage = errorData // Fallback if regex doesn't match
          }
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },

    async EmailOTP(data) {
      this.isLoading = true
      try {
        const response = await apiService.verifyEmail(data)
        console.log('hi')
        if (response.status === 200) {
          this.setTokens(response.data.tokens)
          localStorage.setItem('is_phone_verified', 'false')
          this.router.push({ path: '/reg/phone-number' })
          Notify.create({
            type: 'positive',
            message: response.data.message || 'Proceed to enter phone number',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during registration.' // Default message

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          const errorData = e.response.data.error

          // Convert error object to string if it's an object
          let errorString = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData

          // Use regular expression to extract the error message within 'ErrorDetail(string=...)'
          let regex = /ErrorDetail\(string='(.*?)'/
          let match = regex.exec(errorString)

          if (match && match[1]) {
            errorMessage = match[1] // Extracted error message
          } else {
            errorMessage = errorData // Fallback if regex doesn't match
          }
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },

    async VerifyPhone(data) {
      this.isLoading = true
      try {
        const response = await apiService.VerifyPhoneNumber(data)
        if (response.status === 200) {
          this.router.push({ path: '/reg/phone-number-verify' })
          Notify.create({
            type: 'positive',
            message: 'Enter the One Time Password to verify email',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during registration.' // Default message

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          const errorData = e.response.data.error

          // Convert error object to string if it's an object
          let errorString = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData

          // Use regular expression to extract the error message within 'ErrorDetail(string=...)'
          let regex = /ErrorDetail\(string='(.*?)'/
          let match = regex.exec(errorString)

          if (match && match[1]) {
            errorMessage = match[1] // Extracted error message
          } else {
            errorMessage = errorData // Fallback if regex doesn't match
          }
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
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
          this.router.push({ path: '/pages/home' })

          Notify.create({
            type: 'positive',
            message: res.data.message || 'Registration Successful',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during registration.' // Default message

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          const errorData = e.response.data.error

          // Convert error object to string if it's an object
          let errorString = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData

          // Use regular expression to extract the error message within 'ErrorDetail(string=...)'
          let regex = /ErrorDetail\(string='(.*?)'/
          let match = regex.exec(errorString)

          if (match && match[1]) {
            errorMessage = match[1] // Extracted error message
          } else {
            errorMessage = errorData // Fallback if regex doesn't match
          }
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },

    async OTPResend(data) {
      this.isLoading = true
      try {
        const response = await apiService.generateRegister(data)
        if (response.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'OTP has been sent',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during setup.'

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          errorMessage = e.response.data.error
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },

    async forgotEmail(data) {
      this.isLoading = true
      try {
        const response = await apiService.forgottenEmail(data)
        if (response.status == 200) {
          this.router.push({ path: '/reg/confirm-password' })
          Notify.create({
            type: 'positive',
            message: 'Password reset successful',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during setup.'

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          errorMessage = e.response.data.error
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },

    async ConfirmPassword(data) {
      this.isLoading = true
      try {
        const response = await apiService.confirmPassword(data)
        if (response.status == 200) {
          this.router.push({ path: '/auth/login' })
          Notify.create({
            type: 'positive',
            message: 'Password reset successful',
          })
        }
      } catch (e) {
        let errorMessage = 'An error occurred during setup.'

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.error) {
          errorMessage = e.response.data.error
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },

    async logout() {
      this.isLoading = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const res = await apiService.logout({ refresh_token: refreshToken })
        if (res.status === 204) {
          localStorage.clear()
          this.router.push({ path: '/auth/login' })
        }
        Notify.create({
          type: 'positive',
          message: 'Logout successful',
        })
      } catch (e) {
        let errorMessage = 'An error occurred during login.'

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.detail) {
          errorMessage = e.response.data.detail
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message
        }

        Notify.create({
          type: 'negative',
          message: errorMessage,
        })
      }
    },
  },
})
