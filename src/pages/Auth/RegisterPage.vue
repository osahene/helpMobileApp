<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Register with</div>
      </q-card-section>
      <q-card-section class="flex justify-around">
        <q-btn
          outline
          class="text-subtitle1 q-ma-none shadow-2 text-weight-light"
          style="color: teal"
          icon="fa-brands fa-google"
          label="Google"
          :disabled="!isReady"
          @click.prevent="() => login()"
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
          or register with custom credentials
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none text-weight-light">First Name</h6>
        <q-input class="custom-input" placeholder="Ama" filled v-model.trim="$v.user.first_name.$model" type="text" :error="!$v.user.first_name.required && $v.user.first_name.$dirty"
              :error-message="'First name is required'">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Last Name</h6>
        <q-input class="custom-input" placeholder="Henewaa" filled v-model.trim="$v.user.last_name.$model" type="text" :error="!$v.user.last_name.required && $v.user.last_name.$dirty"
              :error-message="'Last name is required'">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Email Address</h6>
        <q-input class="custom-input" placeholder="amahenewaa@example.com" filled v-model.trim="$v.user.email_address.$model" type="email" :error="
                (!$v.user.email_address.required && $v.user.email_address.$dirty) ||
                (!$v.user.email_address.email && $v.user.email_address.$dirty)
              "
              :error-message="'A valid email is required'">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Password</h6>
        <q-input class="custom-input" placeholder="********" filled v-model.trim="$v.user.password.$model" :type="isPwd ? 'password' : 'text'" :error="
                (!$v.user.password.required && $v.user.password.$dirty) ||
                (!validPassword() && $v.user.password.$dirty)
              "
              :error-message="'Password is invalid'">
          <template v-slot:before>
            <q-icon name="fa-solid fa-key" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="text-center">
        <!-- to="/auth/email-verify" -->
        <q-btn
          
          @click.prevent="onSubmit"
          class="text-subtitle1 q-px-xl q-ma-none shadow-2 text-weight-light"
          :style="{ backgroundColor: $v.$anyDirty && !$v.$invalid ? '#b7d1ed' : '#d3d3d3' }"
          icon="fa-solid fa-file-signature"
          label="Register"
          :disable="!$v.$anyDirty || $v.$invalid"
        />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8 text-weight-light text-h6">
          Already have an account?
          <router-link to="/auth/login"><span class="text-blue-500">Sign In</span> </router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {useAuthStore} from'src/stores/auth.js'
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useQuasar } from "quasar";
import { useTokenClient } from "vue3-google-signin";

const $q = useQuasar()
const RegAuth = useAuthStore()
const user = reactive({
  first_name: "",
  last_name: "",
  email_address: "",
  password: "",
});

const isPwd = ref(true)
const wrongPass = ref(false);

const rules = {
  user: {
    first_name: { required },
    last_name: { required },
    email_address: { required, email },
    password: { required },
  },
};
const $v = useVuelidate(rules, { user });
const validPassword = () => {
  const pwd = user.password;
  return (
    pwd.length >= 5 &&
    /[A-Z]/.test(pwd) 
    // /\d/.test(pwd) &&
    // /[!@#$%^&*()-_+=]/.test(pwd)
  );
};


const onSubmit = async () => {
  $v.value.$touch();
  if ($v.value.$pending || $v.value.$invalid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Please correct the errors in the form",
    });
    return;
  }
  localStorage.clear()
  if (validPassword()) {
    localStorage.setItem("email_address",user.email_address.toLowerCase())
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email_address);
    formData.append("password", user.password);
    await RegAuth.register(formData);
  } else {
    wrongPass.value = true;
  }
};

const handleOnSuccess = async (response) => {
  await RegAuth.socialLogin(response);
};

const handleOnError = (errorResponse) => {
  $q.notify({
    color: "red-5",
    textColor: "white",
    icon: "warning",
    message: errorResponse.message || "Login not successful",
  });
};
const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});

</script>
