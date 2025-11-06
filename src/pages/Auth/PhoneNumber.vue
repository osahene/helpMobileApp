<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <div class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Phone Number</div>
      </div>

      <q-card-section class="q-gutter-xs">
        <div class="flex row items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-solid fa-phone" />
          </div>
          <h6 class="q-ma-none text-weight-light">Phone Number</h6>
        </div>
        <!-- Phone number input here start -->

        <div class="row q-col-gutter-sm">
          <q-select
            class="custom-input"
            dense
            filled
            v-model="selectedCountry"
            :options="countryOptions"
            option-label="label"
            option-value="code"
            emit-value
            map-options
            input-debounce="0"
            popup-content-class="country-select"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <img
                    :src="scope.opt.flag"
                    alt="flag"
                    class="q-ma-none"
                    style="width: 24px; height: 16px"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>{{ scope.opt.code }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:selected>
              <div class="row items-center no-wrap">
                <img
                  v-if="selectedCountryFlag"
                  :src="selectedCountryFlag"
                  alt="flag"
                  style="width: 24px; height: 16px"
                  class="q-mr-sm"
                />
                <span>{{ selectedCountry }}</span>
              </div>
            </template>
          </q-select>
          <!-- Phone number input -->
          <div class="col">
            <q-input
              class="custom-input"
              filled
              v-model.trim="$v.phone_number.$model"
              placeholder="241123456"
              type="tel"
              dense
            />
          </div>
        </div>
        <!-- Phone number input here end -->
      </q-card-section>

      <q-card-section class="text-center">
        <!-- to="/auth/phone-number-verify" -->
        <q-btn
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          :style="{ backgroundColor: $v.$anyDirty && !$v.$invalid ? '#b7d1ed' : '#d3d3d3' }"
          :disable="!$v.$anyDirty || $v.$invalid"
          icon="fa-regular fa-paper-plane"
          label="Submit"
          @click.prevent="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth.js'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useQuasar } from 'quasar'
import allCountries from '../../assets/countries.json'

const PhoneAuth = useAuthStore()
const $q = useQuasar()
const phoneRegex = /^[+][0-9]{1,15}$/
const phone_number = ref('')
const selectedCountry = ref('+233') // default Ghana
const countryOptions = allCountries.map((c) => ({
  name: c.name,
  code: c.dial_code,
  flag: `https://flagcdn.com/w20/${c.code.toLowerCase()}.png`,
}))

const selectedCountryFlag = computed(() => {
  const country = countryOptions.find((c) => c.code === selectedCountry.value)
  return country ? country.flag : null
})

const rules = {
  phone_number: {
    required,
    validFormat: helpers.withMessage('Enter a valid phone number', (value) =>
      phoneRegex.test(value),
    ),
  },
}
const $v = useVuelidate(rules, { phone_number })
const onSubmit = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Please correct the errors in the form',
    })
    return
  }
  // const fullPhone = `${selectedCountry.value}${phone_number.value}`
  localStorage.setItem('country_code', selectedCountry.value)
  localStorage.setItem('phone_number', phone_number.value)

  const formData = new FormData()
  formData.append('country_code', selectedCountry.value)
  formData.append('phone_number', phone_number.value)
  await PhoneAuth.VerifyPhone(formData)
}
</script>
