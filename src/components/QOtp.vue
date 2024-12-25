<template>
  <div>
    <div id="q-app" style="width: max-content">
      <div class="q-pa-md">
        <div class="row q-gutter-x-sm justify-center">
          <q-input
            outlined
            v-for="i in length"
            v-model="fieldValues[i - 1]"
            v-bind="$attrs"
            @keyup="(event) => onKeyUp(event, i - 1)"
            @update:model-value="(value) => onUpdate(value, i - 1)"
            @paste="onPaste"
            :key="i"
            :ref="(el) => updateFieldRef(el, i - 1)"
            maxlength="1"
            input-class="text-center"
            style="width: 6ch"
          ></q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUpdate, nextTick } from 'vue'
// import { Notify } from 'quasar'

// Props
const props = defineProps({
  inputLength: {
    type: Number,
    default: 6,
  },
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])

// Refs and Computed Properties
const fields = ref([])
const fieldValues = ref(Array(props.inputLength).fill(''))

const length = computed(() => props.inputLength)
const composite = computed(() => {
  const nonNullFields = fieldValues.value.filter((value) => value)
  if (length.value !== nonNullFields.length) {
    return ''
  }
  return nonNullFields.join('')
})

// Watchers
watch(composite, (newValue) => {
  if (newValue) {
    emit('update:modelValue', newValue)
    // Notify.create({
    //   message: `New input: ${newValue}`,
    //   type: 'positive',
    // })
    console.log(newValue)
  }
})

// Lifecycle Hook
onBeforeUpdate(() => {
  fields.value = []
})

// Methods
const updateFieldRef = (element, index) => {
  if (element) {
    fields.value[index] = element
  }
}

const focus = (index) => {
  if (index >= 0 && index < length.value) {
    fields.value[index]?.select()
  } else if (index >= length.value) {
    fields.value[index - 1]?.blur()
  }
}

const onUpdate = (value, index) => {
  fieldValues.value[index] = value // Update the specific field value
  emit('update:modelValue', fieldValues.value.join('')) // Emit the partial or full value
  if (value) {
    focus(index + 1) // Focus the next input
  }
}

const onPaste = (event) => {
  const pastedData = event.clipboardData.getData('text').slice(0, length.value) // Limit to input length
  fieldValues.value = Array.from(pastedData).concat(
    Array(length.value - pastedData.length).fill(''),
  )
  emit('update:modelValue', fieldValues.value.join('')) // Emit the full value
  nextTick(() => {
    focus(pastedData.length) // Focus the next empty input field
  })
}

const onKeyUp = (event, index) => {
  const key = event.key

  if (['Tab', 'Shift', 'Meta', 'Control', 'Alt', 'Delete'].includes(key)) {
    return
  }

  if (key === 'ArrowLeft' || key === 'Backspace') {
    focus(index - 1)
  } else if (key === 'ArrowRight') {
    focus(index + 1)
  }
}
</script>

<style lang="scss" scoped></style>
