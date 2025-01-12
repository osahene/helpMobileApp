<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Login with</div>
      </q-card-section>
      <q-card-section class="flex justify-around">
        <q-btn
          outline
          class="text-subtitle1 q-ma-none shadow-2 text-weight-light"
          style="color: teal"
          icon="fa-brands fa-google"
          label="Google"
        />

        <q-separator vertical />
        <q-btn
          outline
          class="text-subtitle1 q-ma-none shadow-2 text-weight-light"
          style="color: blue"
          icon="fa-brands fa-facebook"
          label="Facebook"
        />
      </q-card-section>
      <q-separator class="q-ma-md" inset />
      <q-card-section class="q-pa-sm text-center">
        <div class="text-grey-8 text-weight-light text-h6 q-ma-none">
          or login with custom credentials
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-md text-weight-light">Email Address or Phone Number</h6>
        <q-input class="custom-input" filled v-model.trim="user.email_address"  placeholder="amahenewaa@example.com or +233241123456" type="email" lazy-rules
              :error="$v.user.email_address.$error"
              :error-message="'A valid email is required'">
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
          to="/auth/forgotten-password"
        />
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn
          :disable="!$v.$anyDirty || $v.$invalid"
          :style="{ backgroundColor: $v.$anyDirty && !$v.$invalid ? '#b7d1ed' : '#d3d3d3' }"
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
          <router-link to="/auth/register"><span class="text-blue-500">Register</span> </router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {useAuthStore} from'src/stores/auth.js'
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useQuasar } from "quasar";


const rules = {
  user: {
    email_address: { required, email },
    password: { required },
  },
};
const user = reactive({ email: computed(() => AuthStore.email_address), password: "" });

const $q = useQuasar();
const $v = useVuelidate(rules, { user });
const AuthStore = useAuthStore()


const rem = ref(false)
const isPwd = ref(true)
const onSubmit = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    $q.notify({
      type: "warning",
      message: "Validation error. Please check your inputs.",
    });
    return;
  }
  const formData = new FormData();
  formData.append("email", user.email_address.toLowerCase());
  formData.append("password", user.password);
  localStorage.setItem('email_address', user.email_address.toLowerCase())
  await AuthStore.logins(formData);
  
};
</script>
