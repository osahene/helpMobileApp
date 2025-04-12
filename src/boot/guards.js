import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth.js'

export default boot(({ router }) => {
  const auth = useAuthStore()

  router.beforeEach(async (to, from, next) => {
    // Initialize auth state
    const isAuthenticated = !!auth.accessToken
    const isPhoneVerified = auth.is_phone_verified === true
    const onboardingCompleted = localStorage.getItem('onBoardCount') === 'true'

    // Debugging info (remove in production)
    console.log('[Route Guard]', {
      route: to.name,
      isAuthenticated,
      isPhoneVerified,
      requiresAuth: to.matched.some((r) => r.meta.requiresAuth),
      requiresPhone: to.meta.requiresPhoneVerification,
      isOnboarding: to.meta.isOnboarding,
    })

    // 1. Check for guest-only routes (login/register)
    if (to.meta.guestOnly && isAuthenticated) {
      return next({ name: 'home' }) // Redirect authenticated users away from auth pages
    }

    // 2. Handle public routes
    if (to.meta.public) {
      // Special handling for onboarding
      if (to.meta.isOnboarding && onboardingCompleted) {
        return isAuthenticated ? next({ name: 'home' }) : next({ name: 'login' })
      }
      return next() // Allow access to all public routes
    }

    // 3. Handle unauthenticated users trying to access private routes
    if (!isAuthenticated) {
      // Redirect to onboarding if not completed
      if (!onboardingCompleted) {
        return next({ name: 'onboard' })
      }
      // Otherwise to login with redirect back
      return next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    }

    // 4. Handle temporary auth routes (email/phone verification during registration)
    if (to.meta.requiresTempAuth && !auth.tempAccessToken) {
      return next({ name: 'register' }) // Restart registration if temp auth is missing
    }

    // 5. Check phone verification for protected routes
    if (to.meta.requiresPhoneVerification && !isPhoneVerified) {
      return next({ name: 'phone-number' }) // Force phone verification
    }

    // 6. Final check - if user tries to access onboarding after completion
    if (to.meta.isOnboarding && onboardingCompleted) {
      return next({ name: 'home' })
    }

    // All checks passed - allow navigation
    next()
  })

  // Optional: Handle navigation errors
  router.onError((error) => {
    console.error('[Router Error]', error)
    // You might want to redirect to error page here
  })
})
