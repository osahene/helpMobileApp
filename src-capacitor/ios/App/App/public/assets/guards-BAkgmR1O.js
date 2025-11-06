import { b as boot } from './index-nJYxZ8LO.js'
import { u as useAuthStore } from './auth-0N9PlROk.js'
import './index-Bs10UzzQ.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
const guards = boot(({ router }) => {
  const auth = useAuthStore()
  router.beforeEach(async (to, from, next) => {
    const isAuthenticated = !!auth.accessToken
    const hasCompletedOnboarding = localStorage.getItem('onBoardCount') === 'true'
    if (to.meta.public) {
      if (to.meta.isOnboarding) {
        if (hasCompletedOnboarding) {
          return isAuthenticated ? next({ name: 'home' }) : next({ name: 'login' })
        }
        return next()
      }
      return next()
    }
    if (!isAuthenticated) {
      if (!hasCompletedOnboarding) {
        return next({ name: 'onboard' })
      }
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
    next()
  })
  router.onError((error) => {
    console.error('[Router Error]', error)
  })
})
export { guards as default }
