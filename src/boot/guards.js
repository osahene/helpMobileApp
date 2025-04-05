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
    const onBoardCount = parseInt(localStorage.getItem('onBoardCount') || '0', 10)

    const isPublic = to.matched.some((record) => record.meta.public)
    const isLoginOrRegisterPage = ['/auth/login', '/reg/register'].includes(to.path)
    const isEmailVerificationPage = to.path === '/reg/email-verify'
    const isPhoneVerificationPage = to.path === '/reg/phone-number-verify'
    const isOnboardingPage = to.name === 'onboard'

    // Handle onboarding first
    if (!isAuthenticated) {
      if (onBoardCount < 2 && !isOnboardingPage) {
        return next({ name: 'onboard' })
      }

      if (onBoardCount >= 2 && isOnboardingPage) {
        return next({ name: 'login' })
      }
    }

    // Authenticated route handling
    if (!isAuthenticated && !isPublic) {
      return next({ path: '/auth/login' })
    }

    if (isAuthenticated && !isEmailVerified && !isEmailVerificationPage) {
      return next({ path: '/reg/email-verify' })
    }

    if (isAuthenticated && isEmailVerified && !isPhoneVerified && !isPhoneVerificationPage) {
      return next({ path: '/reg/phone-number-verify' })
    }

    if (
      isAuthenticated &&
      (isLoginOrRegisterPage || isEmailVerificationPage || isPhoneVerificationPage || isOnboardingPage)
    ) {
      return next({ name: 'home' })
    }

    next()
  })
})
