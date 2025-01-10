<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Confirm Password</div>
      </q-card-section>

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-md text-weight-light">New Password</h6>
        <q-input filled v-model.trim="new_password" placeholder="********" type="password">
          <template v-slot:before>
            <q-icon name="fa-solid fa-key" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Confirm Password</h6>
        <q-input filled v-model.trim="confirm_password" placeholder="********" type="password">
          <template v-slot:before>
            <q-icon name="fa-solid fa-key" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          style="color: dark"
          icon="fa-regular fa-paper-plane"
          label="Submit"
          @click="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from "quasar";
import {useAuthStore} from'src/stores/auth.js'
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
const ConfirmPassAuth = useAuthStore()
const $q = useQuasar();

const rules = {
  password: {
    new_password: { required, sameAs:sameAs(confirm_password.value) },
    confirm_password: { required },
  },
};
const $v = useVuelidate(rules, { new_password, confirm_password });
const new_password = ref('')
const confirm_password = ref('')
const onSubmit = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    $q.notify({
      type: "warning",
      message: "Passwords do not match. Please check your inputs.",
    });
    return;
  }

  const formData = new FormData();
  formData.append("password", new_password);
  await ConfirmPassAuth.ConfirmPassword(formData);
};
</script>
