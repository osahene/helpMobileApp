import { boot } from 'quasar/wrappers'
import GoogleSignInPlugin from 'vue3-google-signin'

export default boot(({ app }) => {
  app.use(GoogleSignInPlugin, {
    clientId:
      process.env.NODE_ENV === 'development'
        ? process.env.VITE_googleCred
        : process.env.VITE_clientId,
    // scope:
    //   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read',
    scope: 'profile email', // Simplify scope for testing
    prompt: 'consent', // Force consent prompt
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
