import {
  I as createComponent,
  c as computed,
  h,
  U as hSlot,
  g as getCurrentInstance,
} from './index-Bs10UzzQ.js'
const QCardSection = createComponent({
  name: 'QCardSection',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    horizontal: Boolean,
  },
  setup(props, { slots }) {
    const classes = computed(
      () =>
        `q-card__section q-card__section--${props.horizontal === true ? 'horiz row no-wrap' : 'vert'}`,
    )
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  },
})
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null,
  },
}
function useDark(props, $q) {
  return computed(() => (props.dark === null ? $q.dark.isActive : props.dark))
}
const QCard = createComponent({
  name: 'QCard',
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: 'div',
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
  },
  setup(props, { slots }) {
    const {
      proxy: { $q },
    } = getCurrentInstance()
    const isDark = useDark(props, $q)
    const classes = computed(
      () =>
        'q-card' +
        (isDark.value === true ? ' q-card--dark q-dark' : '') +
        (props.bordered === true ? ' q-card--bordered' : '') +
        (props.square === true ? ' q-card--square no-border-radius' : '') +
        (props.flat === true ? ' q-card--flat no-shadow' : ''),
    )
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  },
})
export { QCard as Q, QCardSection as a, useDark as b, useDarkProps as u }
