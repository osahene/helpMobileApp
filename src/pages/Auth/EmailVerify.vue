<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Email Verification</div>
      </q-card-section>

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none text-weight-light">Enter the OTP</h6>

        <QOtp v-model="otpVal" />
        <div class="flex row justify-between">
          <h6 class="q-ma-none q-mt-md text-weight-light">Resend in {{ timer }} seconds</h6>
          <h6
            class="q-ma-none q-mt-md text-weight-light"
            :class="isDisabled ? 'isDisable' : 'isEnable'"
          >
            <q-btn flat :disable="isDisabled" @click.prevent="handleResend" label="Resend OTP" />
          </h6>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn
          outline
          class="text-subtitle1 q-px-xl q-ma-none shadow-2 text-weight-light"
          style="color: dark"
          icon="fa-regular fa-paper-plane"
          label="Submit"
          @click.prevent="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.js'
import QOtp from 'src/components/QOtp.vue'
const otpVal = ref(null)
const timer = ref(30)
const isDisabled = ref(true)
let intervalId = null

const EmailOTPAuth = useAuthStore()

const email_address = localStorage.getItem('email_address')
const startCountdown = () => {
  timer.value = 30
  isDisabled.value = true

  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1
    } else {
      clearInterval(intervalId)
      isDisabled.value = false
    }
  }, 1000)
}

const handleResend = async () => {
  const formData = new FormData()
  formData.append('email', email_address)
  await EmailOTPAuth.OTPResend(formData)
  startCountdown()
}

const onSubmit = async () => {
  const formData = new FormData()
  formData.append('email', email_address)
  formData.append('otp', otpVal.value)
  await EmailOTPAuth.EmailOTP(formData)
}

onMounted(() => {
  startCountdown()
})
</script>
