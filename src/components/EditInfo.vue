<template>
    <div>
 <q-dialog v-model="editInfoCard" persistent>
      <q-card class="my-card" >
<h5 class="text-xl px-5 pt-5 font-medium text-gray-900 dark:text-white">
            Edit Emergency Contact
          </h5>
        <q-card-section class="q-gutter-xs">
        <h6 class="q-ma-none q-mt-xs text-weight-light">First Name</h6>
        <q-input class="custom-input" :model-value="first_name" filled type="text">
          
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>

        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Last Name</h6>
        <q-input class="custom-input" filled :model-value="last_name" placeholder="Henewaa" type="text">
          <template v-slot:before>
            <q-icon name="fa-regular fa-user" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Email</h6>
        <q-input class="custom-input" filled :model-value="email_address" placeholder="amahenewaa@example.com" type="email">
          <template v-slot:before>
            <q-icon name="fa-regular fa-envelope" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">Phone Number</h6>
        <q-input class="custom-input" filled :model-value="phone_number" placeholder="+233240123456" type="text">
          <template v-slot:before>
            <q-icon name="fa-solid fa-phone" />
          </template>
        </q-input>
        <h6 class="q-ma-none q-mt-md text-weight-light">
          Relation (Who are you to them? Ex: Their son)
        </h6>
        <q-input  class="custom-input" filled :model-value="relation" placeholder="Son" type="text">
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

const handleButton = (button) => {
  button.action()
}

defineEmits(['update:modelValue', 'close'])
watch(
  () => props.modelValue,
  (newValue) => {
    editInfoCard.value = newValue
  },
)
</script>

