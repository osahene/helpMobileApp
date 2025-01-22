<template>
    <div>
 <q-dialog v-model="actions" persistent>
      <q-card class="my-card">
       <div>
        <div class="flex flex-col items-center pb-5">
          <div class="py-5 uppercase">
            <div>

              <h5 v-if="actionType === 'delete'" class="text-xl font-bold text-red-400">Heads Up <span><q-icon :name="fasExclamation"/></span></h5>
            </div>
          </div>
          <q-icon
            v-for="(icon, index) in actionIcon"
            :key="index"
            :name="icon.name"
            :color="icon.color"
            size="xl"
          />
          <div class="p-5">
            <div  class="text-lg dark:text-white">
              <span v-if="message.highlight">
                  {{ message.text.split(message.highlight)[0] }}
                  <strong class="font-bold">{{ message.highlight }}</strong>
                  {{ message.text.split(message.highlight)[1] }}
                </span>
                <span v-else>{{ message.text }}</span>
            </div>
          </div>
          </div>
       </div>

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
import {
  ref,
  watch,
  // computed
} from 'vue'
import { fasExclamation } from '@quasar/extras/fontawesome-v6'

const props = defineProps({
  modelValue: Boolean,
  actionType: {type: String, default: ''},
  actionIcon: {type: Array, default:()=> []},
  message: {type: Object, default:()=> {}},
  buttons: {type: Array, default:()=> []},
})

const actions = ref(props.modelValue)

const handleButton = (button) => {
  button.action()
}

defineEmits(['update:modelValue', 'close'])

watch(
  () => props.modelValue,
  (newValue) => {
    actions.value = newValue
  },
)
</script>
