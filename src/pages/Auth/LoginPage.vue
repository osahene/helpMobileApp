<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Login with</div>
      </q-card-section>
      <q-card-section class="flex justify-around">
        <template v-if="$q.platform.is.mobile">
          <q-btn
            outline
            class="text-subtitle1 q-ma-none shadow-2 text-weight-light"
            style="color: teal"
            icon="fa-brands fa-google"
            label="Google"
            @click="initiateGoogleSignInMobile"
          />
        </template>
        <template v-else>
          
          <GoogleSignInButton
            @success="handleGoogleLoginSuccess"
            @error="handleGoogleLoginError"
            class="text-subtitle1 q-ma-none shadow-2 text-weight-light"
            style="color: teal"
          >
            <template #default>
              <q-icon name="fa-brands fa-google" class="q-mr-sm" />
              Google
            </template>
          </GoogleSignInButton>
        </template>
        <!-- <q-separator vertical />
        <q-btn
          outline
          class="text-subtitle1 q-ma-none shadow-2 text-weight-light"
          style="color: blue"
          icon="fa-brands fa-facebook"
          label="Facebook"
        /> -->
      </q-card-section>
      <q-separator class="q-ma-md" inset />
      <q-card-section class="q-pa-sm text-center">
        <div class="text-grey-8 text-weight-light text-h6 q-ma-none">
          or 
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-md text-weight-light">Email Address or Phone Number</h6>
        <q-input
          class="custom-input"
          filled
          v-model.trim="user.email_address"
          placeholder="amahenewaa@example.com or +233123456789"
          type="email"
          lazy-rules
          :error="$v.user.email_address.$error"
          :error-message="'Enter a valid email or phone number'"
        >
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Password</h6>
        <q-input
          class="custom-input"
          filled
          v-model="$v.user.password.$model"
          placeholder="*********"
          :type="isPwd ? 'password' : 'text'"
          @keydown.enter.prevent="onSubmit"
        >
          <template v-slot:before>
            <q-icon name="fa-solid fa-key" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click.prevent="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="flex max-out q-py-none justify-around">
        <q-checkbox
          dense
          v-model="rem"
          label="Remember me"
          class="text-subtitle1 text-weight-light"
          color="cyan"
        />

        <!-- <q-separator vertical /> -->
        <q-btn
          flat
          class="text-subtitle1 q-ma-none text-weight-light"
          style="color: blue"
          label="Forgotten Password"
          to="/reg/forgotten-password"
        />
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn
          :disable="$v.$invalid"
          :style="{ backgroundColor: !$v.$invalid ? '#b7d1ed' : '#d3d3d3' }"
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          icon="fa-solid fa-arrow-right-to-bracket"
          label="Sign In"
          @click="onSubmit"
        />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8 text-weight-light text-h6">
          Don't have an account?
          <router-link to="/reg/register"><span class="text-blue-500">Register</span> </router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth.js'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useQuasar } from 'quasar'
import { GoogleSignInButton } from 'vue3-google-signin'
import { SocialLogin } from '@capgo/capacitor-social-login';


const isValidEmailOrPhone = (value) => {
  if (!value) return false
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^\+?[0-9]{7,15}$/

  return emailPattern.test(value) || phonePattern.test(value)
}

const rules = {
  user: {
    email_address: { required, isValidEmailOrPhone },
    password: { required },
  },
}
const user = reactive({ email: computed(() => AuthStore.email_address), password: '' })

const $q = useQuasar()
const $v = useVuelidate(rules, { user })
const AuthStore = useAuthStore()

const rem = ref(false)
const isPwd = ref(true)
const onSubmit = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) {
    $q.notify({
      type: 'warning',
      message: 'Validation error. Please check your inputs.',
    })
    return
  }
  const formData = new FormData()
  formData.append(
    'email',
    typeof user.email_address === 'string' && user.email_address.includes('@')
      ? user.email_address.toLowerCase()
      : user.email_address
  )
  formData.append('password', user.password)
  localStorage.setItem('email_address', user.email_address)
  if (rem.value) {
    await AuthStore.loginsRem(formData)
  } else {
    await AuthStore.logins(formData)
  }
}

const initiateGoogleSignInMobile = async () => {
  if ($q.platform.is.mobile) {
    try {
      console.log('Initiating Google Sign-In for mobile...')
      const response = await SocialLogin.login({
        provider: 'google' ,
        options: {
          scopes: ['email', 'profile'],
        }
      }
      )
      console.log('Google Sign-In Response:', response);
      handleGoogleLoginSuccess(response)
    } catch (error) {
      console.error('Google Sign-In Error Details:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      handleGoogleLoginError(error)
    }
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Google Sign-In is not supported on this platform.',
    })
  }
}


const handleGoogleLoginSuccess = async (response) => {
  const { credential } = response
  await AuthStore.socialLogin({ credential })
}

const handleGoogleLoginError = (errorResponse) => {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: errorResponse.message || 'Login not successful',
  })
}
</script>
