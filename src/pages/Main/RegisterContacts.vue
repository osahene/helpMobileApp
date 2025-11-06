<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Register Contacts</div>
      </q-card-section>

      <q-separator class="q-ma-sm" inset />

      <q-card-section class="q-gutter-xs">
        <div class="flex row items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-regular fa-user" />
          </div>
          <h6 class="q-ma-none q-mt-xs text-weight-light">First Name</h6>
        </div>
        <q-input
          class="custom-input"
          filled
          v-model.trim="$v.first_name.$model"
          placeholder="Ama"
          type="text"
          :error="!$v.first_name.required && $v.first_name.$dirty"
          :error-message="'First name is required'"
        >
        </q-input>
        <div class="flex row items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-regular fa-user" />
          </div>
          <h6 class="q-ma-none q-mt-xs text-weight-light">Last Name</h6>
        </div>
        <q-input
          class="custom-input"
          filled
          v-model.trim="$v.last_name.$model"
          placeholder="Henewaa"
          type="text"
          :error="!$v.last_name.required && $v.last_name.$dirty"
          :error-message="'Last name is required'"
        >
        </q-input>
        <div class="flex row items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-regular fa-envelope" />
          </div>
          <h6 class="q-ma-none q-mt-xs text-weight-light">Email</h6>
        </div>
        <q-input
          class="custom-input"
          filled
          v-model.trim="$v.email_address.$model"
          placeholder="amahenewaa@example.com"
          type="email"
          :error="!$v.email_address.required && $v.email_address.$dirty"
          :error-message="'Email is required'"
        >
        </q-input>
        <div class="flex row items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-solid fa-phone" />
          </div>
          <h6 class="q-ma-none q-mt-xs text-weight-light">Phone Number</h6>
        </div>
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
        <!-- Phone number ends -->
        <div class="flex row q-mt-md items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-solid fa-arrows-down-to-people" />
          </div>
          <h6 class="q-ma-none q-mt-xs text-weight-light">Specify Emergency Situation</h6>
        </div>
        <q-select
          filled
          v-model="selectedSituation"
          :options="options"
          multiple
          emit-value
          map-options
          use-chips
          :error="!$v.selectedSituation.required && $v.selectedSituation.$dirty"
          error-message="Please select at least one situation"
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps" clickable @click="toggleOption(opt)">
              <q-item-section>
                <q-item-label>{{ opt.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  dense
                  color="primary"
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="flex row items-center">
          <div class="q-pr-sm">
            <q-icon name="fa-solid fa-people-arrows" />
          </div>
          <h6 class="q-ma-none q-mt-sm text-weight-light">
            Relation (Who are you to them? Ex: Their son)
          </h6>
        </div>
        <q-input
          class="custom-input"
          filled
          v-model.trim="$v.relation.$model"
          placeholder="Son"
          type="text"
          :error="!$v.relation.required && $v.relation.$dirty"
          :error-message="'Relation is required'"
        >
        </q-input>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          :style="{ backgroundColor: $v.$anyDirty && !$v.$invalid ? '#007bff' : '#d3d3d3' }"
          icon="fa-regular fa-paper-plane"
          label="Submit"
          :disable="!$v.$anyDirty || $v.$invalid"
          @click.prevent="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOperations } from 'src/stores/ops'
import { useQuasar } from 'quasar'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import allCountries from '../../assets/countries.json'

const RegContacts = useOperations()

const first_name = ref('')
const last_name = ref('')
const email_address = ref('')
const phone_number = ref('')
const relation = ref('')
const phoneRegex = /^[+][0-9]{1,15}$/
const selectedSituation = ref([])
const options = [
  {
    label: 'Health Crisis',
    value: 1,
  },
  {
    label: 'Robbery Attack',
    value: 2,
  },
  {
    label: 'Fire Outbreak',
    value: 3,
  },
  {
    label: 'Flood Alert',
    value: 4,
  },
  {
    label: 'Call Emergency',
    value: 5,
  },
  {
    label: 'Violence Alert',
    value: 6,
  },
]
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

const resetForm = () => {
  first_name.value = ''
  last_name.value = ''
  email_address.value = ''
  phone_number.value = ''
  relation.value = ''
  $v.value.$reset()
}

const rules = {
  first_name: { required },
  last_name: { required },
  email_address: { required, email },
  phone_number: {
    required,
    validFormat: helpers.withMessage('Enter a valid phone number', (value) =>
      phoneRegex.test(value),
    ),
  },
  relation: { required },
  selectedSituation: {
    required: helpers.withMessage('Select at least one situation', (v) => v.length > 0),
  },
}
const $q = useQuasar()
const $v = useVuelidate(rules, {
  first_name,
  last_name,
  email_address,
  phone_number,
  selectedSituation,
  relation,
})

const onSubmit = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) {
    $q.notify({
      type: 'warning',
      message: 'Please fill all required fields correctly',
    })
    return
  }

  const formData = new FormData()
  formData.append('first_name', first_name.value)
  formData.append('last_name', last_name.value)
  formData.append('email_address', email_address.value)
  formData.append('phone_number', phone_number.value)
  formData.append('situations', JSON.stringify(selectedSituation.value))
  formData.append('relation', relation.value)
  await RegContacts.createRelations(formData)
  resetForm()
}
</script>
<style scoped></style>
