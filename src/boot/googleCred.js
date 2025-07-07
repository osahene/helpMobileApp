import { boot } from 'quasar/wrappers'
import GoogleSignInPlugin from 'vue3-google-signin'
// import { SocialLogin } from '@capgo/capacitor-social-login'
// import { Capacitor } from '@capacitor/core'

// const isNativeMobile = Capacitor.isNativePlatform()
// console.log('isNativeMobile:', isNativeMobile)

export default boot(({ app }) => async () => {
  // if (isNativeMobile) {
  //   app.use(
  //     SocialLogin.initialize({
  //       google: {
  //         androidClientId:
  //           '972387283638-50fgpr3klnhg5ld92jtam1iu69n4s7gf.apps.googleusercontent.com',
  //       },
  //     }),
  //   )
  // } else {
  app.use(GoogleSignInPlugin, {
    clientId:
      process.env.NODE_ENV === 'development'
        ? process.env.VITE_googleCred
        : '972387283638-ad9c1rcda4sc1ki137f80u87po7f07l5.apps.googleusercontent.com',
    scope: 'profile email',
    response_type: 'id_token',
    prompt: 'consent',
    redirect_uri: 'https://helpmobile.vercel.app',
    onSuccess: (response) => {
      // Optional: Handle successful login globally (e.g., redirect)
      console.log('Google Login Success:', response)
    },
    onFailure: (error) => {
      console.error('Google Login Error:', error)
    },
  })
  // }
})
