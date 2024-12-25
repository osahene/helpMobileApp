<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Confirm Password</div>
      </q-card-section>

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-md text-weight-light">New Password</h6>
        <q-input filled v-model="new_password" placeholder="********" type="password">
          <template v-slot:before>
            <q-icon name="fa-solid fa-key" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Confirm Password</h6>
        <q-input filled v-model="confirm_password" placeholder="********" type="password">
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
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const new_password = ref('')
const confirm_password = ref('')
</script>
