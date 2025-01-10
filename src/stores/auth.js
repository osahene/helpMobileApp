import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import apiService from 'src/api/axiosInstance'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    first_name: localStorage.getItem('first_name') || '',
    last_name: localStorage.getItem('last_name') || '',
    email: localStorage.getItem('email') || '',
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

      this.first_name = userDetails.first_name
      this.last_name = userDetails.last_name
      this.email = userDetails.email
      localStorage.setItem('first_name', userDetails.first_name)
      localStorage.setItem('last_name', userDetails.last_name)
      localStorage.setItem('email', userDetails.email)
    },

    async loginsRem(credentials) {
      try {
        const res = await apiService.login(credentials)
        if (res.status === 200) {
          const userDetails = {
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
          }
          this.saveUser(res.data.tokens, userDetails)

          Notify.create({
            type: 'positive',
            message: 'Login successful',
          })
          this.router.push({ path: '/pages/home' })
        }
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

    async logins(credentials) {
      try {
        const res = await apiService.login(credentials)
        if (res.status === 200) {
          ;(this.first_name = res.data.first_name),
            (this.last_name = res.data.last_name),
            (this.email = res.data.email),
            this.setTokens(res.data.tokens)

          Notify.create({
            type: 'positive',
            message: 'Login successful',
          })
          this.router.push({ path: '/pages/home' })
        }
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

    async register(data) {
      this.isLoading = true
      try {
        const response = await apiService.register(data)
        if (response.status === 201) {
          this.router.push({ path: '/auth/email-verify' })
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
        if (response.status === 201) {
          this.router.push({ path: '/auth/phone-number' })
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

    async VerifyPhone(data) {
      this.isLoading = true
      try {
        const response = await apiService.VerifyPhoneNumber(data)
        if (response.status === 201) {
          this.router.push({ path: '/auth/phone-number-verify' })
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
      this.isLoading = true
      try {
        const res = await apiService.VerifyPhoneNumberOTP(data)
        if (res.status === 201) {
          ;(this.first_name = res.data.first_name),
            (this.last_name = res.data.last_name),
            (this.email = res.data.email),
            this.setTokens(res.data.tokens)
          this.router.push({ path: '/pages/home' })
          Notify.create({
            type: 'positive',
            message: 'Registration Successful',
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

    async forgotEmail(data) {
      this.isLoading = true
      try {
        const response = await apiService.forgottenEmail(data)
        if (response.status == 200) {
          this.router.push({ path: '/auth/confirm-password' })
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
