// src/boot/axios.js
import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { Loading, QSpinnerBall, Notify } from 'quasar'

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const $axios = axios.create({
  baseURL: process.env.VITE_baseURL || 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken')
  // if (!refresh) return null
  console.log('Refreshing token not found', refresh)

  try {
    const response = await axios.post(`${$axios.defaults.baseURL}/account/token/refresh/`, {
      refresh,
    })
    console.log('Response from refresh token:', response)
    const { access, refresh: newRefresh } = response.data

    if (access) {
      localStorage.setItem('accessToken', access)
      $axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    }

    if (newRefresh) {
      localStorage.setItem('refreshToken', newRefresh)
    }

    return access
  } catch (error) {
    const errorMessage = error?.response?.data?.detail || error?.message || 'Error refreshing token'
    Notify.create({ type: 'negative', message: errorMessage })
    return null
  }
}

export default boot(({ app, router }) => {
  let userIsActive = true

  const setUserActive = () => {
    userIsActive = true
    localStorage.setItem('lastActive', new Date().toISOString())
  }

  window.addEventListener('mousemove', setUserActive)
  window.addEventListener('keydown', setUserActive)
  window.addEventListener('scroll', setUserActive)

  setInterval(async () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshTokenValue = localStorage.getItem('refreshToken')
    console.log('Access Token: in interval', accessToken)
    if (!accessToken && !refreshTokenValue) return
    console.log('Access Token: after interval', accessToken)

    const now = dayjs()
    const accessExp = accessToken ? dayjs.unix(jwtDecode(accessToken).exp) : null
    console.log('Access Exp:', accessExp)
    const refreshExp = refreshTokenValue ? dayjs.unix(jwtDecode(refreshTokenValue).exp) : null
    const lastActive = dayjs(localStorage.getItem('lastActive'))

    const accessAboutToExpire = accessExp && accessExp.diff(now, 'second') < 60
    const refreshAboutToExpire = refreshExp && refreshExp.diff(now, 'second') < 60
    const userInactive = now.diff(lastActive, 'minute') >= 10

    if ((accessAboutToExpire || refreshAboutToExpire) && userIsActive) {
      console.log('calling for token')
      await refreshToken()
    }

    if (refreshAboutToExpire && userInactive) {
      console.log('User inactive and refresh token expired')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      userIsActive = false
      router.push('/auth/login')
    }
  }, 30000)

  $axios.interceptors.request.use(
    async (config) => {
      Loading.show({
        spinner: QSpinnerBall,
        message: 'Loading...',
        spinnerSize: 140,
        spinnerColor: 'red',
        sanitize: true,
      })

      let accessToken = localStorage.getItem('accessToken')
      console.log('Access Token making request:', accessToken)
      if (accessToken) {
        console.log('Access Token:', accessToken)
        const decoded = jwtDecode(accessToken)
        console.log('Decoded Token:', decoded)
        const isExpired = dayjs.unix(decoded.exp).isBefore(dayjs())

        if (isExpired) {
          if (!isRefreshing) {
            isRefreshing = true
            try {
              const newToken = await refreshToken()
              accessToken = newToken
              processQueue(null, newToken)
            } catch (err) {
              processQueue(err, null)
              throw err
            } finally {
              isRefreshing = false
            }
          }

          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                config.headers['Authorization'] = `Bearer ${token}`
                resolve(config)
              },
              reject: (err) => {
                reject(err)
              },
            })
          })
        }

        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  $axios.interceptors.response.use(
    (response) => {
      Loading.hide()
      return response
    },
    (error) => {
      Loading.hide()
      return Promise.reject(error)
    },
  )

  app.config.globalProperties.$axios = $axios
})

export { $axios }
