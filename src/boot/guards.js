import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth.js'

export default boot(({ store, router }) => {
  const auth = useAuthStore(store)

  auth.$patch({
    accessToken: localStorage.getItem('accessToken') || '',
    is_phone_verified: localStorage.getItem('is_phone_verified') || '',
    email: localStorage.getItem('email_address') || '',
  })

  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!auth.accessToken
    const isEmailVerified = !!auth.email
    const isPhoneVerified = localStorage.getItem('is_phone_verified') === 'true'
    const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true'

    const publicRoutes = ['/auth/login', '/reg/register', '/reg/email-verify', '/reg/phone-number-verify']
    const isPublic = publicRoutes.includes(to.path) || to.matched.some(record => record.meta.public)
    const isOnboardPage = to.name === 'onboard'

    // Debugging logs (remove in production)
    console.log('Route guard check:')
    console.log('- Authenticated:', isAuthenticated)
    console.log('- Onboarding completed:', onboardingCompleted)
    console.log('- Current route:', to.path)

    // Unauthenticated users
    if (!isAuthenticated) {
      // If onboarding not completed and not on onboard page
      if (!onboardingCompleted && !isOnboardPage) {
        console.log('Redirecting to onboarding (not completed)')
        return next({ name: 'onboard' })
      }
      
      // If onboarding completed but on onboard page
      if (onboardingCompleted && isOnboardPage) {
        console.log('Redirecting to login (onboarding already completed)')
        return next({ path: '/auth/login' })
      }

      // If trying to access non-public page
      if (!isPublic && !isOnboardPage) {
        console.log('Redirecting to login (unauthorized access)')
        return next({ path: '/auth/login' })
      }

      // Allow access to public routes or login if onboarding completed
      console.log('Allowing access (public route or completed onboarding)')
      return next()
    }

    // Authenticated but not verified
    if (!isEmailVerified && to.path !== '/reg/email-verify') {
      console.log('Redirecting to email verification')
      return next({ path: '/reg/email-verify' })
    }
    
    if (isEmailVerified && !isPhoneVerified && to.path !== '/reg/phone-number-verify') {
      console.log('Redirecting to phone verification')
      return next({ path: '/reg/phone-number-verify' })
    }

    // Authenticated but trying to access auth/onboarding pages
    if (isPublic || isOnboardPage) {
      console.log('Redirecting to home (already authenticated)')
      return next({ name: 'home' })
    }

    console.log('Allowing access to protected route')
    next()
  })
})