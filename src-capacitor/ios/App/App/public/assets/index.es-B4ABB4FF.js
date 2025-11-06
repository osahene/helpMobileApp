import {
  d as defineComponent,
  a as inject,
  r as ref,
  a0 as watchEffect,
  b as onUnmounted,
  c as computed,
  x as createElementBlock,
  m as openBlock,
  a1 as normalizeStyle,
  a_ as readonly,
  o as onMounted,
  w as watch,
} from './index-Bs10UzzQ.js'
const v = Symbol(),
  R = ref(false),
  C = ref(false),
  B = ref(false),
  T = ref(0)
let k = null
const te = () => {
    const e = document.createElement('script')
    return (
      (e.src = 'https://accounts.google.com/gsi/client'),
      (e.async = true),
      (e.defer = true),
      e
    )
  },
  ne = () => {
    ;((C.value = true),
      (k = te()),
      document.head.appendChild(k),
      (k.onload = () => {
        ;((C.value = false), (R.value = true))
      }),
      (k.onerror = () => {
        ;((C.value = false), (B.value = true))
      }))
  }
watch(
  () => T.value,
  (e, o) => {
    e > 0 && !R.value && !C.value && ne()
  },
)
function x() {
  return (
    onMounted(() => {
      T.value++
    }),
    onUnmounted(() => {
      T.value--
    }),
    {
      scriptLoaded: readonly(R),
      scriptLoadError: readonly(B),
    }
  )
}
const oe = /* @__PURE__ */ defineComponent({
  __name: 'GoogleSignInButton',
  props: {
    oneTap: { type: Boolean },
    autoSelect: { type: Boolean },
    loginUri: {},
    cancelOnTapOutside: { type: Boolean },
    promptParentId: {},
    nonce: {},
    context: {},
    stateCookieDomain: {},
    uxMode: {},
    allowedParentOrigin: {},
    itpSupport: { type: Boolean },
    type: {},
    theme: {},
    size: {},
    text: {},
    shape: {},
    logoAlignment: {},
    width: {},
    locale: {},
  },
  emits: [
    'success',
    'error',
    'intermediateIframeCloseCallback',
    'nativeCallback',
    'promptMomentNotification',
  ],
  setup(e, { emit: o }) {
    const n = { large: 40, medium: 32, small: 20 },
      t = e,
      i = o,
      l = inject(v),
      r = ref(null),
      { scriptLoaded: s } = x()
    ;(watchEffect(() => {
      var a, u, f, p
      s.value &&
        ((a = window.google) == null ||
          a.accounts.id.initialize({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            client_id: l,
            callback: (g) => {
              if (!g.credential) {
                i('error')
                return
              }
              i('success', g)
            },
            allowed_parent_origin: t.allowedParentOrigin,
            auto_select: t.autoSelect,
            cancel_on_tap_outside: t.cancelOnTapOutside,
            context: t.context,
            intermediate_iframe_close_callback: () => {
              i('intermediateIframeCloseCallback')
            },
            itp_support: t.itpSupport,
            login_uri: t.loginUri,
            native_callback: (g) => {
              i('nativeCallback', g)
            },
            nonce: t.nonce,
            prompt_parent_id: t.promptParentId,
            state_cookie_domain: t.stateCookieDomain,
            ux_mode: t.uxMode,
            use_fedcm_for_prompt: true,
          }),
        (f = window.google) == null ||
          f.accounts.id.renderButton(r.value, {
            type: t.type,
            theme: t.theme,
            size: t.size,
            text: t.text,
            shape: t.shape,
            logo_alignment: t.logoAlignment,
            width: (u = t.width) == null ? void 0 : u.toString(),
            locale: t.locale,
          }),
        t.oneTap &&
          ((p = window.google) == null ||
            p.accounts.id.prompt((g) => {
              i('promptMomentNotification', g)
            })))
    }),
      onUnmounted(() => {
        var a
        t.oneTap && ((a = window.google) == null || a.accounts.id.cancel())
      }))
    const d = computed(() => n[t.size || 'large'])
    return (a, u) => (
      openBlock(),
      createElementBlock(
        'div',
        {
          ref_key: 'targetElement',
          ref: r,
          style: normalizeStyle({ display: 'inline-flex', height: d.value }),
        },
        null,
        4,
      )
    )
  },
})
const ae = 'GoogleSignInPlugin',
  O = (e) => `[${ae}]: ${e}`,
  me = {
    install(e, o) {
      if (!o) throw new Error(O('initialize plugin by passing an options object'))
      if (!o.clientId || (o.clientId && o.clientId.trim().length === 0))
        throw new Error(O('clientId is required to initialize'))
      ;(e.provide(v, o.clientId), e.component('GoogleSignInButton', oe))
    },
  }
export { me as m, oe as o }
