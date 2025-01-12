<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Phone Number</div>
      </q-card-section>

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-md text-weight-light">Phone Number</h6>
        <q-input filled v-model.trim="phone_number" placeholder="+233241123456" type="tel">
          <template v-slot:before>
            <q-icon name="fa-solid fa-phone" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="text-center">
        <!-- to="/auth/phone-number-verify" -->
        <q-btn
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
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
import { ref } from 'vue'
import {useAuthStore} from'src/stores/auth.js'
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useQuasar } from "quasar";

const PhoneAuth = useAuthStore()
const $q = useQuasar()
const phoneRegex = /^[+][0-9]{1,15}$/; 
const phone_number = ref('')
const rules = {
     phone_number: {
    required,
    validFormat: helpers.withMessage(
      "Enter a valid phone number",
      (value) => phoneRegex.test(value)
    ),
  },  
};
const $v = useVuelidate(rules, { phone_number });
const onSubmit = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Please correct the errors in the form",
    });
    return;
  }
  const formData = new FormData();
  formData.append("phone_number",phone_number.value);
  await PhoneAuth.VerifyPhone(formData)

}
</script>
