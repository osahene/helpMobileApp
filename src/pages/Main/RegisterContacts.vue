<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Register Contacts</div>
      </q-card-section>

      <q-separator class="q-ma-sm" inset />

      <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-xs text-weight-light">First Name</h6>
        <q-input filled v-model.trim="$v.first_name.$model" placeholder="Ama" type="text" :error="!$v.first_name.required && $v.first_name.$dirty"
              :error-message="'First name is required'">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Last Name</h6>
        <q-input filled v-model.trim="$v.last_name.$model" placeholder="Henewaa" type="text" :error="!$v.last_name.required && $v.last_name.$dirty"
              :error-message="'Last name is required'">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Email</h6>
        <q-input filled v-model.trim="$v.email_address.$model" placeholder="amahenewaa@example.com" type="email" :error="!$v.email_address.required && $v.email_address.$dirty"
              :error-message="'First name is required'">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Phone Number</h6>
        <q-input filled v-model.trim="$v.phone_number.$model" placeholder="+233240123456" type="text" :error="!$v.phone_number.required && $v.phone_number.$dirty"
              :error-message="'Phone number is required'">
          <template v-slot:before>
            <q-icon name="fa-solid fa-phone" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">
          Relation (Who are you to them? Ex: Their son)
        </h6>
        <q-input filled v-model.trim="$v.relation.$model" placeholder="Son" type="text" :error="!$v.relation.required && $v.relation.$dirty"
              :error-message="'Relation is required'">
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
          @click.prevent="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useOperations } from 'src/stores/ops'
import { useQuasar } from "quasar";
import useVuelidate from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";
const RegContacts = useOperations()
const rules = {
  createRela: {
    first_name: { required  },
    last_name: { required },
    email_address: { required, email },
    phone_number: { required, numeric },
    relation: { required },
  },
};
const $q = useQuasar()
const $v = useVuelidate(rules, {first_name, last_name, email_address, relation} )
const first_name = ref('')
const last_name = ref('')
const email_address = ref('')
const phone_number = ref('')
const relation = ref('')

const onSubmit = async () => {
    $v.value.$touch();
  if ($v.value.$invalid) {
    $q.notify({
      type: "warning",
      message: "Check the input",
    });
    return;
  }

  const formData = new FormData()
  formData.append('first_name', first_name)
  formData.append('last_name', last_name)
  formData.append('email', email_address)
  formData.append('phone_number', phone_number)
  formData.append('relation', relation)
  await RegContacts.createRelations(formData)
}

</script>
