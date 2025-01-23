<template>
  <div>
    <q-dialog v-model="localDialogOpen" persistent>
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-center">
            <div class="mt-5 text-xl font-bold text-red-400"><span>Heads Up</span><q-icon :name="fasExclamation" /> </div>
            <div class="text-h5 font-bold q-mt-sm q-mb-xs">
              <span>{{ cardName1 }}</span
              ><span>{{ cardName2 }}</span>
            </div>
            <div class="text-lg pt-5 text-black">
              {{ message }}
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders h-32 w-32" :src="cardImage" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="around">
          <q-btn
            v-for="(button, index) in buttons"
            :key="index"
            @click="handleButtonClick(button)"
            flat
          >
            {{ button.label }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { fasExclamation } from '@quasar/extras/fontawesome-v6'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  modelValue: Boolean,
  cardName1: String,
  cardName2: String,
  cardImage: String,
  message: String,
  buttons: Array,
})

const localDialogOpen = ref(props.modelValue)

defineEmits(['update:modelValue', 'close'])

const handleButtonClick = (button) => {
  if (button.route) {
    router.push(button.route)
  } else if (button.action) {
    button.action()
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    localDialogOpen.value = newValue
  },
)
</script>
