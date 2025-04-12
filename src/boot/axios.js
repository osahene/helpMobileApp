import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { Loading, QSpinnerBall, Notify } from 'quasar'

// Creating Axios instance with default configuration
const $axios = axios.create({
  baseURL: process.env.VITE_baseURL ? process.env.VITE_baseURL : 'http://127.0.0.1:8000',
  withCredentials: true,
  'Content-type': 'application/json',
})

// Function to refresh access token
const TakeRefreshToken = async () => {
  console.log('Refreshing token...')
  const refreshToken = localStorage.getItem('refreshToken')
  // if (!refreshToken) return null
  console.log('Refresh token found:', refreshToken)
  try {
    // Making a POST request to refresh the token
    console.log('Making request to refresh token')
    const { data } = await axios.post(`${$axios.defaults.baseURL}/account/token/refresh/`, {
      refresh: refreshToken,
    })
    console.log('Token refreshed successfully', data)
    const { access, refresh } = data

    if (access) {
      localStorage.setItem('accessToken', access)
      $axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    }

    if (refresh) {
      localStorage.setItem('refreshToken', refresh)
    }

    return {
      accessToken: access,
      refreshToken: refresh || refreshToken,
    }
  } catch (e) {
    const errorMessage = e?.response?.data?.detail || e?.message || 'Error refreshing token'
    Notify.create({ type: 'negative', message: errorMessage })
    return null
  }
}

export default async ({ router }) => {
  console.log('Axios boot file loaded working')

  let userIsActive = true

  const setUserActive = () => {
    userIsActive = true
    localStorage.setItem('lastActive', new Date().toISOString())
  }

  window.addEventListener('mousemove', setUserActive)
  window.addEventListener('keydown', setUserActive)
  window.addEventListener('scroll', setUserActive)

  /**
   * Periodically checks and refreshes tokens if needed
   */
  console.log('Scheduling token refresh starting ...')
  const scheduleTokenRefresh = () => {
    console.log('Scheduling token refresh...')
    setInterval(async () => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      if (!accessToken && !refreshToken) {
        console.log('No tokens found, redirecting to login')
        await TakeRefreshToken()
      }

      if (accessToken && refreshToken) {
        const now = dayjs()
        const accessExp = dayjs.unix(jwtDecode(accessToken).exp)
        const refreshExp = dayjs.unix(jwtDecode(refreshToken).exp)
        const lastActive = dayjs(localStorage.getItem('lastActive'))

        const accessAboutToExpire = accessExp.diff(now, 'minute') <= 1
        const refreshAboutToExpire = refreshExp.diff(now, 'minute') <= 1
        const userInactive = now.diff(lastActive, 'minute') >= 10

        if ((accessAboutToExpire || refreshAboutToExpire) && userIsActive) {
          await TakeRefreshToken()
        }

        if (refreshAboutToExpire && userInactive) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          userIsActive = false
          router.push('/auth/login')
        }
      }
    }, 30000) // every 30 seconds
  }

  scheduleTokenRefresh()

  $axios.interceptors.request.use(async (req) => {
    Loading.show({
      spinner: QSpinnerBall,
      message: 'Loading...',
      spinnerSize: 140,
      spinnerColor: 'red',
      sanitize: true,
    })

    let accessToken = localStorage.getItem('accessToken')
    console.log('axos access', accessToken)
    if (accessToken) {
      const user = jwtDecode(accessToken)
      const isExpired = dayjs.unix(user.exp).isBefore(dayjs())

      if (isExpired) {
        const tokens = await TakeRefreshToken()
        accessToken = tokens?.accessToken
        if (!accessToken) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          router.push('/auth/login')
          return req
        }
      }

      req.headers.Authorization = `Bearer ${accessToken}`
    }

    return req
  })

  $axios.interceptors.response.use(
    (response) => {
      // Hide loading spinner after response
      Loading.hide()
      return response
    },
    (error) => {
      // Hide loading spinner on error
      Loading.hide()
      return Promise.reject(error)
    },
  )
}

export { $axios }
