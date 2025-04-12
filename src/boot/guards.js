import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth.js'

export default boot(({ store, router }) => {
  const auth = useAuthStore(store)

  // Initialize auth state - consider moving this to store's init
  auth.$patch({
    accessToken: localStorage.getItem('accessToken') || null,
    is_phone_verified: localStorage.getItem('is_phone_verified') === 'true',
    email: localStorage.getItem('email_address') || null,
  })

  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!auth.accessToken
    const isPublicRoute = to.matched.some((record) => record.meta.public)
    const onboardingCompleted = localStorage.getItem('onBoardCount') === 'true'
    const isOnboardPage = to.name === 'onboard'

    console.log('Navigation guard triggered:', {
      to: to.name,
      isAuthenticated,
      isPublicRoute,
      onboardingCompleted,
      isOnboardPage,
    })
    // 1. Handle public routes
    if (isPublicRoute) {
      // If user is authenticated and trying to access login/register, redirect home
      if (isAuthenticated && ['login', 'register'].includes(to.name)) {
        return next({ name: 'home' })
      }
      return next()
    }

    // 2. Handle unauthenticated users
    if (!isAuthenticated) {
      // Redirect to onboarding if not completed
      if (!onboardingCompleted && !isOnboardPage) {
        return next({ name: 'onboard' })
      }
      // Otherwise redirect to login
      return next({ name: 'login' })
    }

    // 3. Handle authenticated users
    // Only redirect to home if trying to access auth pages
    if (['login', 'register', 'onboard'].includes(to.name)) {
      return next({ name: 'home' })
    }

    // 4. All other cases - allow navigation
    next()
  })
})
