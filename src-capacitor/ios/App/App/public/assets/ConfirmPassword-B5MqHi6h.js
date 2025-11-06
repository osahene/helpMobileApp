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
  a1 as normalizeStyle,
} from './index-Bs10UzzQ.js'
import { Q as QInput } from './QInput-C0L2HJsB.js'
import { Q as QPage } from './QPage-DCmqepVD.js'
import { u as useQuasar } from './use-quasar-CD5xJ-Qg.js'
import { u as useAuthStore } from './auth-0N9PlROk.js'
import { s as sameAs, u as useVuelidate, r as required } from './index-CvuUrq8s.js'
import './uid-CiaxOpXt.js'
import './focus-manager-B-vefqia.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
const _sfc_main = {
  __name: 'ConfirmPassword',
  setup(__props) {
    const ConfirmPassAuth = useAuthStore()
    const $q = useQuasar()
    const rules = {
      password: {
        new_password: { required, sameAs: sameAs(confirm_password.value) },
        confirm_password: { required },
      },
    }
    const $v = useVuelidate(rules, { new_password, confirm_password })
    const new_password = ref('')
    const confirm_password = ref('')
    const onSubmit = async () => {
      $v.value.$touch()
      if ($v.value.$invalid) {
        $q.notify({
          type: 'warning',
          message: 'Passwords do not match. Please check your inputs.',
        })
        return
      }
      const formData = new FormData()
      formData.append('password', new_password)
      await ConfirmPassAuth.ConfirmPassword(formData)
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
                            _cache[2] ||
                            (_cache[2] = [
                              createBaseVNode(
                                'div',
                                { class: 'text-grey-9 text-weight-light' },
                                'Confirm Password',
                                -1,
                              ),
                            ]),
                        ),
                        _: 1,
                        __: [2],
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'q-gutter-xs' },
                      {
                        default: withCtx(() => [
                          _cache[3] ||
                            (_cache[3] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'New Password',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).new_password.$model,
                              'onUpdate:modelValue':
                                _cache[0] ||
                                (_cache[0] = ($event) => (unref($v).new_password.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: '********',
                              type: 'password',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-solid fa-key' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue'],
                          ),
                          _cache[4] ||
                            (_cache[4] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Confirm Password',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).confirm_password.$model,
                              'onUpdate:modelValue':
                                _cache[1] ||
                                (_cache[1] = ($event) =>
                                  (unref($v).confirm_password.$model = $event)),
                              modelModifiers: { trim: true },
                              placeholder: '********',
                              type: 'password',
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-solid fa-key' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue'],
                          ),
                        ]),
                        _: 1,
                        __: [3, 4],
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
                              disable: !unref($v).$anyDirty || unref($v).$invalid,
                              icon: 'fa-regular fa-paper-plane',
                              label: 'Submit',
                              onClick: onSubmit,
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
