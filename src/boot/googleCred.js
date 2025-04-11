import { boot } from 'quasar/wrappers'
import GoogleSignInPlugin from 'vue3-google-signin'

export default boot(({ app }) => {
  app.use(GoogleSignInPlugin, {
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
})
