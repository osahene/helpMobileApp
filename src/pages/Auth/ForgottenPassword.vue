<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Email</div>
      </q-card-section>

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-md text-weight-light">Enter your Email</h6>
        <q-input
          class="custom-input"
          filled
          v-model.trim="$v.email_address.$model"
          placeholder="amahenewaa@example.com"
          type="email"
          :error="!$v.email_address.required && $v.email_address.$dirty"
          :error-message="'Email is required'"
        >
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          :disable="!$v.$anyDirty || $v.$invalid"
          :style="{ backgroundColor: $v.$anyDirty && !$v.$invalid ? '#b7d1ed' : '#d3d3d3' }"
          icon="fa-regular fa-paper-plane"
          label="Submit"
          @click.prevent="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth.js'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useQuasar } from 'quasar'

const ForgotEmail = useAuthStore()
const email_address = ref('')
const rules = {
  email_address: { required, email },
}
const $q = useQuasar()
const $v = useVuelidate(rules, { email_address })

const onSubmit = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) {
    $q.notify({
      type: 'warning',
      message: 'Email is incorrect. Please check your inputs.',
    })
    return
  }

  const formData = new FormData()
  formData.append('email', email_address.value?.toLowerCase())
  await ForgotEmail.forgotEmail(formData)
}
</script>
