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

    const onboardingCompleted = localStorage.getItem('onBoardCount') === 'true'
    const isOnboardPage = to.name === 'onboard'

    // Unauthenticated users
    if (!isAuthenticated) {
      // If onboarding not completed and not on onboard page
      if (!onboardingCompleted && !isOnboardPage) {
        console.log('Redirecting to onboarding (not completed)')
        return next({ name: 'onboard' })
      }

      console.log('Allowing access (public route or completed onboarding)')
      return next()
    } else {
      return next({ name: 'home' })
    }

    // // Authenticated but not verified
    // if (!isEmailVerified && to.path !== '/reg/email-verify') {
    //   console.log('Redirecting to email verification')
    //   return next({ path: '/reg/email-verify' })
    // }

    // if (isEmailVerified && !isPhoneVerified && to.path !== '/reg/phone-number-verify') {
    //   console.log('Redirecting to phone verification')
    //   return next({ path: '/reg/phone-number-verify' })
    // }

    // // Authenticated but trying to access auth/onboarding pages
    // if (isPublic || isOnboardPage) {
    //   console.log('Redirecting to home (already authenticated)')
    //   return next({ name: 'home' })
    // }
  })
})
