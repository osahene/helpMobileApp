import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import apiService from 'src/api/axiosInstance'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,

    first_name: localStorage.getItem('first_name') || '',
    last_name: localStorage.getItem('last_name') || '',
    email: localStorage.getItem('email') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.accessToken
    },
  },

  actions: {
    setAccessToken(token) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
    },

    saveUser(token, userDetails) {
      this.setAccessToken(token)

      this.first_name = userDetails.first_name
      this.last_name = userDetails.last_name
      this.email = userDetails.email
      localStorage.setItem('first_name', userDetails.first_name)
      localStorage.setItem('last_name', userDetails.last_name)
      localStorage.setItem('email', userDetails.email)
    },
    removeUser() {
      localStorage.clear()
      this.accessToken = ''
      this.refreshToken = ''
      this.company_name = ''
      this.company_logo = ''
      this.email = ''
      this.first_name = ''
      this.last_name = ''
    },

    async logins(credentials) {
      try {
        const res = await apiService.login(credentials)
        if (res.status === 200) {
          const userDetails = {
            company_name: res.data.company_name,
            company_logo: res.data.company_logo,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
          }
          this.saveUser(res.data.tokens.access, userDetails)
          this.refreshToken = res.data.tokens.refresh
          localStorage.setItem('refreshToken', this.refreshToken)
          Notify.create({
            type: 'positive',
            message: 'Login successful',
          })
          this.router.push({ path: '/dash/main' })
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
          this.router.push({ path: '/auth/verify' })
          Notify.create({
            type: 'positive',
            message: 'Verify the email in your mail. Registration successful',
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

    async setNewPassword(data) {
      this.isLoading = true
      try {
        const response = await apiService.setNewPasswords(data)
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

    async resetPassword(data) {
      this.isLoading = true
      const res = await apiService.forgotPasswords(data)
      if (res.status == 200) {
        const urlParts = res.data.split('/')
        const uid64P = urlParts[urlParts.length - 3]
        const tk = urlParts[urlParts.length - 2]
        localStorage.setItem('uid64', uid64P)
        localStorage.setItem('token', tk)
        this.router.push({ path: '/auth/resetPassword' })
        Notify.create({
          type: 'positive',
          message: 'Proceed to your email to verify the action.',
        })
      }
    },

    async logout() {
      this.isLoading = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const res = await apiService.logout({ refresh_token: refreshToken })
        if (res.status === 204) {
          this.removeUser()
          this.router.push({ name: 'Login' })
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
    async pushSubscribe(data) {
      this.loading = true
      try {
        const res = await apiService.subscription(data)
        if (res.status == 201) {
          this.router.push({ path: '/' })
          Notify.create({
            type: 'positive',
            message: 'Subscription successfully created',
          })
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
  },
})
