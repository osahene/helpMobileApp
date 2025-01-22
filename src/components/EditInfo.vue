<template>
    <div>
 <q-dialog v-model="editInfoCard" persistent>
      <q-card class="my-card" >
<h5 class="text-xl px-5 pt-5 font-medium text-gray-900 dark:text-white">
            Edit Emergency Contact
          </h5>
        <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-xs text-weight-light">First Name</h6>
        <q-input class="custom-input" v-model="FirstName" placeholder="Ama" filled type="text">
          
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>

        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Last Name</h6>
        <q-input class="custom-input" filled v-model="LastName" placeholder="Henewaa" type="text">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Email</h6>
        <q-input class="custom-input" filled v-model="EmailAddress" placeholder="amahenewaa@example.com" type="email">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Phone Number</h6>
        <q-input class="custom-input" filled v-model="PhoneNumber" placeholder="+233240123456" type="text">
          <template v-slot:before>
            <q-icon name="fa-solid fa-phone" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">
          Relation (Who are you to them? Ex: Their son)
        </h6>
        <q-input  class="custom-input" filled v-model="Relation" placeholder="Son" type="text">
          <template v-slot:before>
            <q-icon name="fa-solid fa-people-arrows" />
          </template>
        </q-input>
      </q-card-section>

        <q-separator />

        <q-card-actions align="around">
          <q-btn
            v-for="(button, index) in buttons"
            :key="index"
            @click="handleButton(button)"
            flat
            :icon="button.icon"
            :label="button.label"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  first_name: String,
  last_name: String,
  email_address: String,
  phone_number: String,
  relation: String,
  buttons: Array,
})
const editInfoCard = ref(props.modelValue)
const FirstName = ref(props.first_name);
const LastName = ref(props.last_name);
const EmailAddress = ref(props.email_address);
const PhoneNumber = ref(props.phone_number);
const Relation = ref(props.relation);

const emit = defineEmits(['update:modelValue', 'updateField', 'close'])

const handleButton = (button) => {
  emit('updateField', {
      first_name: FirstName.value,
      last_name: LastName.value,
      email_address: EmailAddress.value,
      phone_number: PhoneNumber.value,
      relation: Relation.value,
    });
  button.action()
}

watch(
  () => props.modelValue,
  (newValue) => {
    editInfoCard.value = newValue
    if (newValue) {
      FirstName.value = props.first_name;
      LastName.value = props.last_name;
      EmailAddress.value = props.email_address;
      PhoneNumber.value = props.phone_number;
      Relation.value = props.relation;
    };
  },
)
</script>

