import { boot } from 'quasar/wrappers'
import GoogleSignInPlugin from 'vue3-google-signin'
import { SocialLogin } from '@capgo/capacitor-social-login'
export default boot(({ app }) => {
  app
    .use(GoogleSignInPlugin, {
      clientId:
        process.env.NODE_ENV === 'development'
          ? process.env.VITE_googleCred
          : process.env.VITE_clientId,
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
    .use(
      SocialLogin.initialize({
        google: {
          webClientId: '972387283638-50fgpr3klnhg5ld92jtam1iu69n4s7gf.apps.googleusercontent.com',
        },
      }),
    )
})
