import { Q as QCard, a as QCardSection } from './QCard-7XTvnQPP.js'
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
import { u as useAuthStore } from './auth-0N9PlROk.js'
import { u as useVuelidate, e as email, r as required } from './index-CvuUrq8s.js'
import { u as useQuasar } from './use-quasar-CD5xJ-Qg.js'
import './uid-CiaxOpXt.js'
import './focus-manager-B-vefqia.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
const _sfc_main = {
  __name: 'ForgottenPassword',
  setup(__props) {
    const ForgotEmail = useAuthStore()
    const email_address = ref('')
    const rules = {
      email_address: { required, email },
    }
    const $q = useQuasar()
    const $v = useVuelidate(rules, { email_address })
    const onSubmit = async () => {
      $v.value.$touch()
      if ($v.value.$invalid) {
        $q.notify({
          type: 'warning',
          message: 'Email is incorrect. Please check your inputs.',
        })
        return
      }
      const formData = new FormData()
      formData.append('email', email_address.value?.toLowerCase())
      await ForgotEmail.forgotEmail(formData)
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
                            _cache[1] ||
                            (_cache[1] = [
                              createBaseVNode(
                                'div',
                                { class: 'text-grey-9 text-weight-light' },
                                'Email',
                                -1,
                              ),
                            ]),
                        ),
                        _: 1,
                        __: [1],
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'q-gutter-xs' },
                      {
                        default: withCtx(() => [
                          _cache[2] ||
                            (_cache[2] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Enter your Email',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).email_address.$model,
                              'onUpdate:modelValue':
                                _cache[0] ||
                                (_cache[0] = ($event) => (unref($v).email_address.$model = $event)),
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
                        ]),
                        _: 1,
                        __: [2],
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
                              class:
                                'text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light',
                              disable: !unref($v).$anyDirty || unref($v).$invalid,
                              style: normalizeStyle({
                                backgroundColor:
                                  unref($v).$anyDirty && !unref($v).$invalid
                                    ? '#b7d1ed'
                                    : '#d3d3d3',
                              }),
                              icon: 'fa-regular fa-paper-plane',
                              label: 'Submit',
                              onClick: withModifiers(onSubmit, ['prevent']),
                            },
                            null,
                            8,
                            ['disable', 'style'],
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
