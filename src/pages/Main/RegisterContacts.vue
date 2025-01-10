<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Register Contacts</div>
      </q-card-section>

      <q-separator class="q-ma-sm" inset />

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-xs text-weight-light">First Name</h6>
        <q-input filled v-model="first_name" placeholder="Ama" type="text">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Last Name</h6>
        <q-input filled v-model="last_name" placeholder="Henewaa" type="text">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Email</h6>
        <q-input filled v-model="email" placeholder="amahenewaa@example.com" type="email">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Phone Number</h6>
        <q-input filled v-model="phone_number" placeholder="+233240123456" type="text">
          <template v-slot:before>
            <q-icon name="fa-solid fa-phone" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">
          Relation (Who are you to them? Ex: Their son)
        </h6>
        <q-input filled v-model="relation" placeholder="Son" type="text">
          <template v-slot:before>
            <q-icon name="fa-solid fa-people-arrows" />
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
          to="/pages/home"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const phone_number = ref('')
const relation = ref('')
</script>
