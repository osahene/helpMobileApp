import { Q as QInput } from './QInput-C0L2HJsB.js'
import {
  r as ref,
  c as computed,
  w as watch,
  as as onBeforeUpdate,
  x as createElementBlock,
  m as openBlock,
  A as createBaseVNode,
  F as Fragment,
  y as renderList,
  l as createBlock,
  a$ as mergeProps,
  a4 as nextTick,
} from './index-Bs10UzzQ.js'
const _hoisted_1 = {
  id: 'q-app',
  style: { width: 'max-content' },
}
const _hoisted_2 = { class: 'q-pa-md' }
const _hoisted_3 = { class: 'row q-gutter-x-sm justify-center' }
const _sfc_main = {
  __name: 'QOtp',
  props: {
    inputLength: {
      type: Number,
      default: 6,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(__props, { emit: __emit }) {
    const props = __props
    const emit = __emit
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
    watch(composite, (newValue) => {
      if (newValue) {
        emit('update:modelValue', newValue)
        console.log(newValue)
      }
    })
    onBeforeUpdate(() => {
      fields.value = []
    })
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
      fieldValues.value[index] = value
      emit('update:modelValue', fieldValues.value.join(''))
      if (value) {
        focus(index + 1)
      }
    }
    const onPaste = (event) => {
      const pastedData = event.clipboardData.getData('text').slice(0, length.value)
      fieldValues.value = Array.from(pastedData).concat(
        Array(length.value - pastedData.length).fill(''),
      )
      emit('update:modelValue', fieldValues.value.join(''))
      nextTick(() => {
        focus(pastedData.length)
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
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createBaseVNode('div', _hoisted_1, [
            createBaseVNode('div', _hoisted_2, [
              createBaseVNode('div', _hoisted_3, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(length.value, (i) => {
                    return (
                      openBlock(),
                      createBlock(
                        QInput,
                        mergeProps(
                          {
                            outlined: '',
                            modelValue: fieldValues.value[i - 1],
                            'onUpdate:modelValue': ($event) => (fieldValues.value[i - 1] = $event),
                          },
                          { ref_for: true },
                          _ctx.$attrs,
                          {
                            onKeyup: (event) => onKeyUp(event, i - 1),
                            'onUpdate:modelValue': (value) => onUpdate(value, i - 1),
                            onPaste,
                            key: i,
                            ref_for: true,
                            ref: (el) => updateFieldRef(el, i - 1),
                            maxlength: '1',
                            'input-class': 'text-center',
                            style: { width: '6ch' },
                          },
                        ),
                        null,
                        16,
                        ['modelValue', 'onUpdate:modelValue', 'onKeyup'],
                      )
                    )
                  }),
                  128,
                )),
              ]),
            ]),
          ]),
        ])
      )
    }
  },
}
export { _sfc_main as _ }
