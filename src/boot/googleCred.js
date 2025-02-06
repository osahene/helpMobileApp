import { boot } from 'quasar/wrappers'
import GoogleSignInPlugin from 'vue3-google-signin'

export default boot(({ app }) => {
  app.use(GoogleSignInPlugin, {
    clientId:
      process.env.VITE_clientId ||
      '259617319662-jr8j5s35tkd1kd79kd84bdk2s5dkdp13.apps.googleusercontent.com',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read',
    onSuccess: (response) => {
      // Optional: Handle successful login globally (e.g., redirect)
      console.log('Google Login Success:', response)
    },
    onFailure: (error) => {
      console.error('Google Login Error:', error)
    },
  })
})
