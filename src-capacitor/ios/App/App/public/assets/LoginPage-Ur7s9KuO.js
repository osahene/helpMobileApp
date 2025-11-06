import { Q as QCard, a as QCardSection } from './QCard-7XTvnQPP.js'
import {
  t as reactive,
  c as computed,
  r as ref,
  k as resolveComponent,
  l as createBlock,
  m as openBlock,
  n as withCtx,
  f as createVNode,
  A as createBaseVNode,
  u as unref,
  M as createTextVNode,
  Q as QIcon,
  aY as withKeys,
  G as withModifiers,
  E as QBtn,
  a1 as normalizeStyle,
} from './index-Bs10UzzQ.js'
import { Q as QSeparator } from './QSeparator-C1pDE3mk.js'
import { Q as QInput } from './QInput-C0L2HJsB.js'
import { Q as QCheckbox } from './QCheckbox-C6lyL8HN.js'
import { Q as QPage } from './QPage-DCmqepVD.js'
import { u as useAuthStore } from './auth-0N9PlROk.js'
import { u as useVuelidate, r as required } from './index-CvuUrq8s.js'
import { u as useQuasar } from './use-quasar-CD5xJ-Qg.js'
import { o as oe } from './index.es-B4ABB4FF.js'
import './uid-CiaxOpXt.js'
import './focus-manager-B-vefqia.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
const _hoisted_1 = { class: 'text-grey-8 text-weight-light text-h6' }
const _sfc_main = {
  __name: 'LoginPage',
  setup(__props) {
    const isValidEmailOrPhone = (value) => {
      if (!value) return false
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phonePattern = /^\+?[0-9]{7,15}$/
      return emailPattern.test(value) || phonePattern.test(value)
    }
    const rules = {
      user: {
        email_address: { required, isValidEmailOrPhone },
        password: { required },
      },
    }
    const user = reactive({ email: computed(() => AuthStore.email_address), password: '' })
    const $q = useQuasar()
    const $v = useVuelidate(rules, { user })
    const AuthStore = useAuthStore()
    const rem = ref(false)
    const isPwd = ref(true)
    const onSubmit = async () => {
      $v.value.$touch()
      if ($v.value.$invalid) {
        $q.notify({
          type: 'warning',
          message: 'Validation error. Please check your inputs.',
        })
        return
      }
      const formData = new FormData()
      formData.append(
        'email',
        typeof user.email_address === 'string' && user.email_address.includes('@')
          ? user.email_address.toLowerCase()
          : user.email_address,
      )
      formData.append('password', user.password)
      localStorage.setItem('email_address', user.email_address)
      if (rem.value) {
        await AuthStore.loginsRem(formData)
      } else {
        await AuthStore.logins(formData)
      }
    }
    const handleGoogleLoginSuccess = async (response) => {
      const { credential } = response
      await AuthStore.socialLogin({ credential })
    }
    const handleGoogleLoginError = (errorResponse) => {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: errorResponse.message || 'Login not successful',
      })
    }
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent('router-link')
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
                            _cache[4] ||
                            (_cache[4] = [
                              createBaseVNode(
                                'div',
                                { class: 'text-grey-9 text-weight-light' },
                                'Login with',
                                -1,
                              ),
                            ]),
                        ),
                        _: 1,
                        __: [4],
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'flex justify-around' },
                      {
                        default: withCtx(() => [
                          createVNode(
                            unref(oe),
                            {
                              onSuccess: handleGoogleLoginSuccess,
                              onError: handleGoogleLoginError,
                              class: 'text-subtitle1 q-ma-none shadow-2 text-weight-light',
                              style: { color: 'teal' },
                            },
                            {
                              default: withCtx(() => [
                                createVNode(QIcon, {
                                  name: 'fa-brands fa-google',
                                  class: 'q-mr-sm',
                                }),
                                _cache[5] || (_cache[5] = createTextVNode(' Google ')),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                    createVNode(QSeparator, {
                      class: 'q-ma-md',
                      inset: '',
                    }),
                    createVNode(
                      QCardSection,
                      { class: 'q-pa-sm text-center' },
                      {
                        default: withCtx(
                          () =>
                            _cache[6] ||
                            (_cache[6] = [
                              createBaseVNode(
                                'div',
                                { class: 'text-grey-8 text-weight-light text-h6 q-ma-none' },
                                ' or ',
                                -1,
                              ),
                            ]),
                        ),
                        _: 1,
                        __: [6],
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'q-gutter-xs' },
                      {
                        default: withCtx(() => [
                          _cache[7] ||
                            (_cache[7] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Email Address or Phone Number',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: user.email_address,
                              'onUpdate:modelValue':
                                _cache[0] ||
                                (_cache[0] = ($event) => (user.email_address = $event)),
                              modelModifiers: { trim: true },
                              placeholder: 'amahenewaa@example.com or +233123456789',
                              type: 'email',
                              'lazy-rules': '',
                              error: unref($v).user.email_address.$error,
                              'error-message': 'Enter a valid email or phone number',
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
                          _cache[8] ||
                            (_cache[8] = createBaseVNode(
                              'h6',
                              { class: 'q-ma-none q-mt-md text-weight-light' },
                              'Password',
                              -1,
                            )),
                          createVNode(
                            QInput,
                            {
                              class: 'custom-input',
                              filled: '',
                              modelValue: unref($v).user.password.$model,
                              'onUpdate:modelValue':
                                _cache[2] ||
                                (_cache[2] = ($event) => (unref($v).user.password.$model = $event)),
                              placeholder: '*********',
                              type: isPwd.value ? 'password' : 'text',
                              onKeydown: withKeys(withModifiers(onSubmit, ['prevent']), ['enter']),
                            },
                            {
                              before: withCtx(() => [
                                createVNode(QIcon, { name: 'fa-solid fa-key' }),
                              ]),
                              append: withCtx(() => [
                                createVNode(
                                  QIcon,
                                  {
                                    name: isPwd.value ? 'visibility_off' : 'visibility',
                                    class: 'cursor-pointer',
                                    onClick:
                                      _cache[1] ||
                                      (_cache[1] = withModifiers(
                                        ($event) => (isPwd.value = !isPwd.value),
                                        ['prevent'],
                                      )),
                                  },
                                  null,
                                  8,
                                  ['name'],
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['modelValue', 'type', 'onKeydown'],
                          ),
                        ]),
                        _: 1,
                        __: [7, 8],
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'flex max-out q-py-none justify-around' },
                      {
                        default: withCtx(() => [
                          createVNode(
                            QCheckbox,
                            {
                              dense: '',
                              modelValue: rem.value,
                              'onUpdate:modelValue':
                                _cache[3] || (_cache[3] = ($event) => (rem.value = $event)),
                              label: 'Remember me',
                              class: 'text-subtitle1 text-weight-light',
                              color: 'cyan',
                            },
                            null,
                            8,
                            ['modelValue'],
                          ),
                          createVNode(QBtn, {
                            flat: '',
                            class: 'text-subtitle1 q-ma-none text-weight-light',
                            style: { color: 'blue' },
                            label: 'Forgotten Password',
                            to: '/reg/forgotten-password',
                          }),
                        ]),
                        _: 1,
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
                              disable: unref($v).$invalid,
                              style: normalizeStyle({
                                backgroundColor: !unref($v).$invalid ? '#b7d1ed' : '#d3d3d3',
                              }),
                              flat: '',
                              class:
                                'text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light',
                              icon: 'fa-solid fa-arrow-right-to-bracket',
                              label: 'Sign In',
                              onClick: onSubmit,
                            },
                            null,
                            8,
                            ['disable', 'style'],
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                    createVNode(
                      QCardSection,
                      { class: 'text-center q-pt-none' },
                      {
                        default: withCtx(() => [
                          createBaseVNode('div', _hoisted_1, [
                            _cache[10] ||
                              (_cache[10] = createTextVNode(" Don't have an account? ")),
                            createVNode(
                              _component_router_link,
                              { to: '/reg/register' },
                              {
                                default: withCtx(
                                  () =>
                                    _cache[9] ||
                                    (_cache[9] = [
                                      createBaseVNode(
                                        'span',
                                        { class: 'text-blue-500' },
                                        'Register',
                                        -1,
                                      ),
                                    ]),
                                ),
                                _: 1,
                                __: [9],
                              },
                            ),
                          ]),
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
