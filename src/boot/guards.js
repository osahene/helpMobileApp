import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth.js'

export default boot(({ router }) => {
  const auth = useAuthStore()

  router.beforeEach(async (to, from, next) => {
    const isAuthenticated = !!auth.accessToken
    const hasCompletedOnboarding = localStorage.getItem('onBoardCount') === 'true'

    // 1. Handle public routes (like login, register)
    if (to.meta.public) {
      // If it's the onboarding route
      if (to.meta.isOnboarding) {
        // If user already completed onboarding, redirect appropriately
        if (hasCompletedOnboarding) {
          return isAuthenticated ? next({ name: 'home' }) : next({ name: 'login' })
        }
        // Otherwise allow access to onboarding
        return next()
      }
      // Allow access to other public routes
      return next()
    }

    // 2. Handle unauthenticated users
    if (!isAuthenticated) {
      // If onboarding not completed, redirect to onboarding
      if (!hasCompletedOnboarding) {
        return next({ name: 'onboard' })
      }
      // Otherwise redirect to login
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    // 3. Handle authenticated users - allow access
    next()
  })

  // Optional error handling
  router.onError((error) => {
    console.error('[Router Error]', error)
  })
})
