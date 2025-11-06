import { Q as QCard, a as QCardSection } from './QCard-7XTvnQPP.js'
import {
  r as ref,
  o as onMounted,
  l as createBlock,
  m as openBlock,
  n as withCtx,
  f as createVNode,
  A as createBaseVNode,
  C as toDisplayString,
  H as normalizeClass,
  E as QBtn,
  G as withModifiers,
} from './index-Bs10UzzQ.js'
import { Q as QPage } from './QPage-DCmqepVD.js'
import { u as useAuthStore } from './auth-0N9PlROk.js'
import { _ as _sfc_main$1 } from './QOtp-v6rO0Rsq.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
import './QInput-C0L2HJsB.js'
import './uid-CiaxOpXt.js'
import './focus-manager-B-vefqia.js'
const _hoisted_1 = { class: 'flex row justify-between' }
const _hoisted_2 = { class: 'q-ma-none q-mt-md text-weight-light' }
const _sfc_main = {
  __name: 'PhoneNumberVerify',
  setup(__props) {
    const otpVal = ref(null)
    const timer = ref(30)
    const isDisabled = ref(true)
    let intervalId = null
    const PhoneOTPAuth = useAuthStore()
    const phone_number = localStorage.getItem('phone_number')
    const startCountdown = () => {
      timer.value = 30
      isDisabled.value = true
      intervalId = setInterval(() => {
        if (timer.value > 0) {
          timer.value -= 1
        } else {
          clearInterval(intervalId)
          isDisabled.value = false
        }
      }, 1e3)
    }
    const handleResend = async () => {
      const formData = new FormData()
      formData.append('phone_number', phone_number)
      await PhoneOTPAuth.OTPResend(formData)
      startCountdown()
    }
    const onSubmit = async () => {
      const formData = new FormData()
      formData.append('phone_number', phone_number)
      formData.append('otp', otpVal.value)
      await PhoneOTPAuth.PhoneVerifyOTP(formData)
    }
    onMounted(() => {
      startCountdown()
    })
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
                  class: 'q-pa-md shadow-10 backdrop-blur my_card',
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
                                'Phone Number Verification',
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
                              { class: 'q-ma-none text-weight-light' },
                              'Enter the OTP',
                              -1,
                            )),
                          createVNode(
                            _sfc_main$1,
                            {
                              modelValue: otpVal.value,
                              'onUpdate:modelValue':
                                _cache[0] || (_cache[0] = ($event) => (otpVal.value = $event)),
                            },
                            null,
                            8,
                            ['modelValue'],
                          ),
                          createBaseVNode('div', _hoisted_1, [
                            createBaseVNode(
                              'h6',
                              _hoisted_2,
                              'Resend in ' + toDisplayString(timer.value) + ' seconds',
                              1,
                            ),
                            createBaseVNode(
                              'h6',
                              {
                                class: normalizeClass([
                                  'q-ma-none q-mt-md text-weight-light',
                                  isDisabled.value ? 'isDisable' : 'isEnable',
                                ]),
                              },
                              [
                                createVNode(
                                  QBtn,
                                  {
                                    flat: '',
                                    disable: isDisabled.value,
                                    onClick: withModifiers(handleResend, ['prevent']),
                                    label: 'Resend Code',
                                  },
                                  null,
                                  8,
                                  ['disable'],
                                ),
                              ],
                              2,
                            ),
                          ]),
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
                          createVNode(QBtn, {
                            outline: '',
                            class: 'text-subtitle1 q-px-xl q-ma-none shadow-2 text-weight-light',
                            style: { color: 'dark' },
                            icon: 'fa-regular fa-paper-plane',
                            label: 'Submit',
                            onClick: withModifiers(onSubmit, ['prevent']),
                          }),
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
