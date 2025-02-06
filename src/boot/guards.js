import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth.js'

export default boot(({ store, router }) => {
  const auth = useAuthStore(store)

  auth.$patch({
    accessToken: localStorage.getItem('accessToken') || '',
  })

  router.beforeEach((to, from, next) => {
    const isAuthenticated = auth.accessToken
    const isPublic = to.matched.some((record) => record.meta.public)
    const isPhoneVerified = auth.is_phone_verified === 'true'
    const isPhoneVerificationPage = to.path === '/auth/phone-number'

    // If not authenticated and trying to access a private route, redirect to Login
    if (!isAuthenticated && !isPublic) {
      return next({ path: '/auth/login' })
    }

    if (isAuthenticated && !isPhoneVerified && !isPhoneVerificationPage) {
      return next({ path: '/auth/phone-number' })
    }

    // If authenticated and trying to access a public page, redirect to Dashboard
    if (isAuthenticated && isPhoneVerified && isPhoneVerificationPage) {
      return next({ name: 'home' })
    }

    next()
  })
})
