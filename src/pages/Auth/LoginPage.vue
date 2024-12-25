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
        <q-input filled v-model="email" placeholder="sam@example.com or +233241123456" type="email">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Password</h6>
        <q-input
          filled
          v-model="password"
          placeholder="*********"
          :type="isPwd ? 'password' : 'text'"
        >
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
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          style="color: dark"
          icon="fa-solid fa-arrow-right-to-bracket"
          label="Sign In"
        />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8 text-weight-light text-h6">
          Don't have an account?
          <router-link to="/auth/register">Register</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const rem = ref(false)
const email = ref('')
const password = ref('')
const isPwd = ref(true)
</script>
