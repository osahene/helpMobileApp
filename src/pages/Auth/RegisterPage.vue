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
      <hr class="q-mt-md border-b-1 border-blueGray-300" />
      <q-card-section class="q-pa-sm text-center">
        <div class="text-grey-8 text-weight-light text-h6 q-ma-none">
          or register with custom credentials
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none text-weight-light">First Name</h6>
        <q-input filled v-model="first_name" type="text">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Last Name</h6>
        <q-input filled v-model="last_name" type="text">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Email Address</h6>
        <q-input filled v-model="email" type="email">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Password</h6>
        <q-input filled v-model="password" :type="isPwd ? 'password' : 'text'">
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
        <q-btn
          to="/auth/email-verify"
          outline
          class="text-subtitle1 q-px-xl q-ma-none shadow-2 text-weight-light"
          style="color: dark"
          icon="fa-solid fa-file-signature"
          label="Register"
        />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8 text-weight-light text-h6">
          Already have an account?
          <router-link to="/auth/login">Sign In</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const isPwd = ref(true)
</script>

<style>
.container {
  width: 100%;
}
.h-full {
  height: 100%;
}
hr {
  border-top-width: 0.5px;
  border-color: 'red';
  opacity: 1;
}
.backdrop-blur {
  backdrop-filter: blur(5px);
  /* background-color: rgba(204, 199, 199, 0.4); */
  /* opacity: 5; */
}
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
