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

    const isPublic = to.matched.some((record) => record.meta.public)
    const isLoginOrRegisterPage = ['/auth/login', '/auth/register'].includes(to.path)
    const isEmailVerificationPage = to.path === '/auth/email-verify'
    const isPhoneVerificationPage = to.path === '/auth/phone-number-verify'

    // If not authenticated and trying to access a private route, redirect to Login
    if (!isAuthenticated && !isPublic) {
      return next({ path: '/auth/login' })
    }

    if (isAuthenticated && !isEmailVerified && !isEmailVerificationPage) {
      return next({ path: '/auth/email-verify' })
    }

    if (isAuthenticated && isEmailVerified && !isPhoneVerified && !isPhoneVerificationPage) {
      return next({ path: '/auth/phone-number-verify' })
    }

    // If authenticated and trying to access a public page, redirect to Dashboard
    if (
      isAuthenticated &&
      (isLoginOrRegisterPage || isEmailVerificationPage || isPhoneVerificationPage)
    ) {
      return next({ name: 'home' })
    }

    next()
  })
})
