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
  const onboardCount = parseInt(localStorage.getItem('onBoardCount') || '0', 10)

  const isPublic = to.matched.some((record) => record.meta.public)
  const isLoginOrRegister = ['/auth/login', '/reg/register'].includes(to.path)
  const isEmailVerifyPage = to.path === '/reg/email-verify'
  const isPhoneVerifyPage = to.path === '/reg/phone-number-verify'
  const isOnboardPage = to.name === 'onboard'

  // Unauthenticated users
  if (!isAuthenticated) {
    if (onboardCount < 2 && !isOnboardPage) {
      return next({ name: 'onboard' })
    }
    if (onboardCount >= 2 && isOnboardPage) {
      return next({ name: 'login' })
    }
    if (!isPublic && !isOnboardPage) {
      return next({ path: '/auth/login' })
    }
    return next()
  }

  // Authenticated but not verified
  if (!isEmailVerified && !isEmailVerifyPage) {
    return next({ path: '/reg/email-verify' })
  }
  if (isEmailVerified && !isPhoneVerified && !isPhoneVerifyPage) {
    return next({ path: '/reg/phone-number-verify' })
  }

  // Authenticated but trying to access auth/onboarding pages
  if (isLoginOrRegister || isEmailVerifyPage || isPhoneVerifyPage || isOnboardPage) {
    return next({ name: 'home' })
  }

  next()
})

})
