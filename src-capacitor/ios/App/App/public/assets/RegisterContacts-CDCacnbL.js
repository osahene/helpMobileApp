import { Q as QCard, a as QCardSection } from './QCard-7XTvnQPP.js'
import { Q as QSeparator } from './QSeparator-C1pDE3mk.js'
import {
  r as ref,
  l as createBlock,
  m as openBlock,
  n as withCtx,
  f as createVNode,
  A as createBaseVNode,
  u as unref,
  Q as QIcon,
  E as QBtn,
  G as withModifiers,
  a1 as normalizeStyle,
} from './index-Bs10UzzQ.js'
import { Q as QInput } from './QInput-C0L2HJsB.js'
import { Q as QPage } from './QPage-DCmqepVD.js'
import { u as useOperations } from './ops-Dc5so7QF.js'
import { u as useQuasar } from './use-quasar-CD5xJ-Qg.js'
import { c as common, u as useVuelidate, r as required, e as email } from './index-CvuUrq8s.js'
import './uid-CiaxOpXt.js'
import './focus-manager-B-vefqia.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
const _sfc_main = {
  __name: 'RegisterContacts',
  setup(__props) {
    const RegContacts = useOperations()
    const first_name = ref('')
    const last_name = ref('')
    const email_address = ref('')
    const phone_number = ref('')
    const relation = ref('')
    const phoneRegex = /^[+][0-9]{1,15}$/
    const resetForm = () => {
      first_name.value = ''
      last_name.value = ''
      email_address.value = ''
      phone_number.value = ''
      relation.value = ''
      $v.value.$reset()
    }
    const rules = {
      first_name: { required },
      last_name: { required },
      email_address: { required, email },
      phone_number: {
        required,
        validFormat: common.withMessage('Enter a valid phone number', (value) =>
          phoneRegex.test(value),
        ),
      },
      relation: { required },
    }
    const $q = useQuasar()
    const $v = useVuelidate(rules, { first_name, last_name, email_address, phone_number, relation })
    const onSubmit = async () => {
      $v.value.$touch()
      if ($v.value.$invalid) {
        $q.notify({
          type: 'warning',
          message: 'Check the input',
        })
        return
      }
      const formData = new FormData()
      formData.append('first_name', first_name.value)
      formData.append('last_name', last_name.value)
      formData.append('email_address', email_address.value)
      formData.append('phone_number', phone_number.value)
      formData.append('relation', relation.value)
      await RegContacts.createRelations(formData)
      resetForm()
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          QPage,
          { class: 'flex flex-center' },
          {
            default: withCtx(() => [
              createVNode(
                QCard,
                {
                  class: 'q-pa-md q-px-lg shadow-10 backdrop-blur my_card',
                  rounded: '',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      QCardSection,
                      { class: 'text-center text-h5' },
                      {
                        default: withCtx(
                          () =>
                            _cache[5] ||
                            (_cache[5] = [
                              createBaseVNode(
                                'div',
                                { class: 'text-grey-9 text-weight-light' },
                                'Register Contacts',
                                -1,
                              ),
                            ]),
                        ),
                        _: 1,
                        __: [5],
                      },
                    ),
                    createVNode(QSeparator, {
                      class: 'q-ma-sm',
                      inset: '',
                    }),
                    createVNode(
                      QCardSection,
                      { class: 'q-gutter-xs' },
                      {
                        default: withCtx(() => [
                          _cache[6] ||
                            (_cache[6] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-xs text-weight-light' },
                              'First Name',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).first_name.$model,
                              'onUpdate:modelValue':
                                _cache[0] ||
                                (_cache[0] = ($event) => (unref($v).first_name.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: 'Ama',
                              type: 'text',
                              error: !unref($v).first_name.required && unref($v).first_name.$dirty,
                              'error-message': 'First name is required',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-regular fa-user' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue', 'error'],
                          ),
                          _cache[7] ||
                            (_cache[7] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Last Name',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).last_name.$model,
                              'onUpdate:modelValue':
                                _cache[1] ||
                                (_cache[1] = ($event) => (unref($v).last_name.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: 'Henewaa',
                              type: 'text',
                              error: !unref($v).last_name.required && unref($v).last_name.$dirty,
                              'error-message': 'Last name is required',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-regular fa-user' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue', 'error'],
                          ),
                          _cache[8] ||
                            (_cache[8] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Email',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).email_address.$model,
                              'onUpdate:modelValue':
                                _cache[2] ||
                                (_cache[2] = ($event) => (unref($v).email_address.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: 'amahenewaa@example.com',
                              type: 'email',
                              error:
                                !unref($v).email_address.required && unref($v).email_address.$dirty,
                              'error-message': 'Email is required',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-regular fa-envelope' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue', 'error'],
                          ),
                          _cache[9] ||
                            (_cache[9] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Phone Number',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).phone_number.$model,
                              'onUpdate:modelValue':
                                _cache[3] ||
                                (_cache[3] = ($event) => (unref($v).phone_number.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: '+233240123456',
                              type: 'text',
                              error:
                                !unref($v).phone_number.required && unref($v).phone_number.$dirty,
                              'error-message': 'Phone number is required',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-solid fa-phone' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue', 'error'],
                          ),
                          _cache[10] ||
                            (_cache[10] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              ' Relation (Who are you to them? Ex: Their son) ',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).relation.$model,
                              'onUpdate:modelValue':
                                _cache[4] ||
                                (_cache[4] = ($event) => (unref($v).relation.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: 'Son',
                              type: 'text',
                              error: !unref($v).relation.required && unref($v).relation.$dirty,
                              'error-message': 'Relation is required',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-solid fa-people-arrows' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue', 'error'],
                          ),
                        ]),
                        _: 1,
                        __: [6, 7, 8, 9, 10],
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'text-center' },
                      {
                        default: withCtx(() => [
                          createVNode(
                            QBtn,
                            {
                              flat: '',
                              class:
                                'text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light',
                              style: normalizeStyle({
                                backgroundColor:
                                  unref($v).$anyDirty && !unref($v).$invalid
                                    ? '#007bff'
                                    : '#d3d3d3',
                              }),
                              icon: 'fa-regular fa-paper-plane',
                              label: 'Submit',
                              disable: !unref($v).$anyDirty || unref($v).$invalid,
                              onClick: withModifiers(onSubmit, ['prevent']),
                            },
                            null,
                            8,
                            ['style', 'disable'],
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
              ),
            ]),
            _: 1,
          },
        )
      )
    }
  },
}
export { _sfc_main as default }
