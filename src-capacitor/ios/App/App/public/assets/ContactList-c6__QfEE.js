import {
  I as createComponent,
  g as getCurrentInstance,
  h,
  U as hSlot,
  a2 as hUniqueSlot,
  Q as QIcon,
  c as computed,
  a3 as noop,
  r as ref,
  w as watch,
  a4 as nextTick,
  a5 as debounce,
  a6 as onBeforeMount,
  a7 as onDeactivated,
  a8 as onActivated,
  R as onBeforeUnmount,
  a9 as scrollTargetProp,
  aa as getScrollTarget,
  ab as listenOpts,
  o as onMounted,
  L as hMergeSlot,
  ac as useSizeProps,
  ad as useSize,
  ae as hDir,
  af as hMergeSlotSafely,
  ag as stopAndPrevent,
  ah as Ripple,
  J as useRouterLinkProps,
  K as useRouterLink,
  ai as isKeyCode,
  aj as prevent,
  ak as addEvt,
  al as cleanEvt,
  am as client,
  an as getScrollbarWidth,
  ao as position,
  ap as childHasFocus,
  S as Transition,
  aq as isDeepEqual,
  ar as shouldIgnoreKey,
  as as onBeforeUpdate,
  at as onUpdated,
  au as stop,
  av as vmHasRouter,
  aw as History,
  ax as isNumber,
  ay as isDate,
  az as isObject,
  aA as injectMultipleProps,
  aB as injectProp,
  E as QBtn,
  x as createElementBlock,
  m as openBlock,
  f as createVNode,
  n as withCtx,
  A as createBaseVNode,
  F as Fragment,
  y as renderList,
  l as createBlock,
  a1 as normalizeStyle,
  B as createCommentVNode,
  M as createTextVNode,
  u as unref,
  C as toDisplayString,
} from './index-Bs10UzzQ.js'
import { Q as QSeparator } from './QSeparator-C1pDE3mk.js'
import { u as useDarkProps, b as useDark, Q as QCard, a as QCardSection } from './QCard-7XTvnQPP.js'
import { r as rtlHasScrollBug } from './rtl-DDpZOXNn.js'
import {
  u as useFieldEmits,
  a as useFieldProps,
  b as useField,
  c as useFieldState,
  d as useFormProps,
  e as useFormInputNameAttr,
  f as fieldValueIsFilled,
  g as useKeyComposition,
  Q as QInput,
} from './QInput-C0L2HJsB.js'
import { c as clearSelection, n as normalizeToInterval } from './format-D0aLtpjt.js'
import {
  p as portalProxyList,
  u as useModelToggleEmits,
  b as useTransitionProps,
  c as useModelToggleProps,
  d as useTransition,
  e as useModelToggle,
  f as usePortal,
  g as addEscapeKey,
  r as removeEscapeKey,
  h as addFocusout,
  i as removeFocusout,
  j as closePortalMenus,
  a as QDialog,
  Q as QCardActions,
} from './QDialog-SglhtH9C.js'
import { a as useTick, u as useTimeout } from './use-timeout-CEFzdXL5.js'
import { a as addFocusFn } from './focus-manager-B-vefqia.js'
import { Q as QCheckbox } from './QCheckbox-C6lyL8HN.js'
import { u as useOperations } from './ops-Dc5so7QF.js'
import {
  b as fasExclamation,
  c as farCircleXmark,
  d as fasXmark,
  e as fasCircleCheck,
  g as farTrashCan,
  h as farPenToSquare,
} from './index-BEVCGQIV.js'
import './uid-CiaxOpXt.js'
import './axiosInstance-9n5X4jXu.js'
import './axios-DsnWYMmf.js'
const QTh = createComponent({
  name: 'QTh',
  props: {
    props: Object,
    autoWidth: Boolean,
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance()
    const {
      proxy: { $q },
    } = vm
    const onClick = (evt) => {
      emit('click', evt)
    }
    return () => {
      if (props.props === void 0) {
        return h(
          'th',
          {
            class: props.autoWidth === true ? 'q-table--col-auto-width' : '',
            onClick,
          },
          hSlot(slots.default),
        )
      }
      let col, child
      const name = vm.vnode.key
      if (name) {
        col = props.props.colsMap[name]
        if (col === void 0) return
      } else {
        col = props.props.col
      }
      if (col.sortable === true) {
        const action = col.align === 'right' ? 'unshift' : 'push'
        child = hUniqueSlot(slots.default, [])
        child[action](
          h(QIcon, {
            class: col.__iconClass,
            name: $q.iconSet.table.arrowUp,
          }),
        )
      } else {
        child = hSlot(slots.default)
      }
      const data = {
        class: col.__thClass + (props.autoWidth === true ? ' q-table--col-auto-width' : ''),
        style: col.headerStyle,
        onClick: (evt) => {
          col.sortable === true && props.props.sort(col)
          onClick(evt)
        },
      }
      return h('th', data, child)
    }
  },
})
const roleAttrExceptions = ['ul', 'ol']
const QList = createComponent({
  name: 'QList',
  props: {
    ...useDarkProps,
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance()
    const isDark = useDark(props, vm.proxy.$q)
    const role = computed(() => (roleAttrExceptions.includes(props.tag) ? null : 'list'))
    const classes = computed(
      () =>
        'q-list' +
        (props.bordered === true ? ' q-list--bordered' : '') +
        (props.dense === true ? ' q-list--dense' : '') +
        (props.separator === true ? ' q-list--separator' : '') +
        (isDark.value === true ? ' q-list--dark' : '') +
        (props.padding === true ? ' q-list--padding' : ''),
    )
    return () => h(props.tag, { class: classes.value, role: role.value }, hSlot(slots.default))
  },
})
const separatorValues = ['horizontal', 'vertical', 'cell', 'none']
const QMarkupTable = createComponent({
  name: 'QMarkupTable',
  props: {
    ...useDarkProps,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: 'horizontal',
      validator: (v) => separatorValues.includes(v),
    },
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance()
    const isDark = useDark(props, vm.proxy.$q)
    const classes = computed(
      () =>
        `q-markup-table q-table__container q-table__card q-table--${props.separator}-separator` +
        (isDark.value === true ? ' q-table--dark q-table__card--dark q-dark' : '') +
        (props.dense === true ? ' q-table--dense' : '') +
        (props.flat === true ? ' q-table--flat' : '') +
        (props.bordered === true ? ' q-table--bordered' : '') +
        (props.square === true ? ' q-table--square' : '') +
        (props.wrapCells === false ? ' q-table--no-wrap' : ''),
    )
    return () =>
      h(
        'div',
        {
          class: classes.value,
        },
        [h('table', { class: 'q-table' }, hSlot(slots.default))],
      )
  },
})
function getTableMiddle(props, content) {
  return h('div', props, [h('table', { class: 'q-table' }, content)])
}
const aggBucketSize = 1e3
const scrollToEdges = ['start', 'center', 'end', 'start-force', 'center-force', 'end-force']
const filterProto = Array.prototype.filter
const setOverflowAnchor =
  window.getComputedStyle(document.body).overflowAnchor === void 0
    ? noop
    : function (contentEl, index) {
        if (contentEl === null) return
        if (contentEl._qOverflowAnimationFrame !== void 0) {
          cancelAnimationFrame(contentEl._qOverflowAnimationFrame)
        }
        contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
          if (contentEl === null) return
          contentEl._qOverflowAnimationFrame = void 0
          const children = contentEl.children || []
          filterProto
            .call(children, (el2) => el2.dataset && el2.dataset.qVsAnchor !== void 0)
            .forEach((el2) => {
              delete el2.dataset.qVsAnchor
            })
          const el = children[index]
          if (el?.dataset) {
            el.dataset.qVsAnchor = ''
          }
        })
      }
function sumFn(acc, h2) {
  return acc + h2
}
function getScrollDetails(
  parent,
  child,
  beforeRef,
  afterRef,
  horizontal,
  rtl,
  stickyStart,
  stickyEnd,
) {
  const parentCalc =
      parent === window ? document.scrollingElement || document.documentElement : parent,
    propElSize = horizontal === true ? 'offsetWidth' : 'offsetHeight',
    details = {
      scrollStart: 0,
      scrollViewSize: -stickyStart - stickyEnd,
      scrollMaxSize: 0,
      offsetStart: -stickyStart,
      offsetEnd: -stickyEnd,
    }
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
      details.scrollViewSize += document.documentElement.clientWidth
    } else {
      details.scrollStart = parentCalc.scrollLeft
      details.scrollViewSize += parentCalc.clientWidth
    }
    details.scrollMaxSize = parentCalc.scrollWidth
    if (rtl === true) {
      details.scrollStart =
        (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) -
        details.scrollStart
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0
      details.scrollViewSize += document.documentElement.clientHeight
    } else {
      details.scrollStart = parentCalc.scrollTop
      details.scrollViewSize += parentCalc.clientHeight
    }
    details.scrollMaxSize = parentCalc.scrollHeight
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains('q-virtual-scroll--skip') === false) {
        details.offsetStart += el[propElSize]
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains('q-virtual-scroll--skip') === false) {
        details.offsetEnd += el[propElSize]
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(),
      childRect = child.getBoundingClientRect()
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left
      details.offsetEnd -= childRect.width
    } else {
      details.offsetStart += childRect.top - parentRect.top
      details.offsetEnd -= childRect.height
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart
  }
  return details
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === 'end') {
    scroll = (parent === window ? document.body : parent)[
      horizontal === true ? 'scrollWidth' : 'scrollHeight'
    ]
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll =
          (rtlHasScrollBug === true
            ? document.body.scrollWidth - document.documentElement.clientWidth
            : 0) - scroll
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll)
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll
    }
    parent.scrollLeft = scroll
  } else {
    parent.scrollTop = scroll
  }
}
function sumSize(sizeAgg, size, from, to) {
  if (from >= to) {
    return 0
  }
  const lastTo = size.length,
    fromAgg = Math.floor(from / aggBucketSize),
    toAgg = Math.floor((to - 1) / aggBucketSize) + 1
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0)
  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0)
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0)
  }
  return total
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: 10,
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1,
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1,
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24,
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0,
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0,
  },
  tableColspan: [Number, String],
}
const commonVirtScrollPropsList = Object.keys(commonVirtScrollProps)
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps,
}
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed,
  // optional
}) {
  const vm = getCurrentInstance()
  const { props, emit, proxy } = vm
  const { $q } = proxy
  let prevScrollStart,
    prevToIndex,
    localScrollViewSize,
    virtualScrollSizesAgg = [],
    virtualScrollSizes
  const virtualScrollPaddingBefore = ref(0)
  const virtualScrollPaddingAfter = ref(0)
  const virtualScrollSliceSizeComputed = ref({})
  const beforeRef = ref(null)
  const afterRef = ref(null)
  const contentRef = ref(null)
  const virtualScrollSliceRange = ref({ from: 0, to: 0 })
  const colspanAttr = computed(() => (props.tableColspan !== void 0 ? props.tableColspan : 100))
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize)
  }
  const needsReset = computed(
    () => virtualScrollItemSizeComputed.value + ';' + props.virtualScrollHorizontal,
  )
  const needsSliceRecalc = computed(
    () =>
      needsReset.value +
      ';' +
      props.virtualScrollSliceRatioBefore +
      ';' +
      props.virtualScrollSliceRatioAfter,
  )
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize()
  })
  watch(needsReset, reset)
  function reset() {
    localResetVirtualScroll(prevToIndex, true)
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex)
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget()
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd,
    )
    localScrollViewSize !== scrollDetails.scrollViewSize &&
      setVirtualScrollSize(scrollDetails.scrollViewSize)
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) !== -1
        ? edge
        : prevToIndex !== -1 && toIndex > prevToIndex
          ? 'end'
          : 'start',
    )
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget()
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return
    const scrollDetails = getScrollDetails(
        scrollEl,
        getVirtualScrollEl(),
        beforeRef.value,
        afterRef.value,
        props.virtualScrollHorizontal,
        $q.lang.rtl,
        props.virtualScrollStickySizeStart,
        props.virtualScrollStickySizeEnd,
      ),
      listLastIndex = virtualScrollLength.value - 1,
      listEndOffset =
        scrollDetails.scrollMaxSize -
        scrollDetails.offsetStart -
        scrollDetails.offsetEnd -
        virtualScrollPaddingAfter.value
    if (prevScrollStart === scrollDetails.scrollStart) return
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0)
      return
    }
    localScrollViewSize !== scrollDetails.scrollViewSize &&
      setVirtualScrollSize(scrollDetails.scrollViewSize)
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from)
    const scrollMaxStart = Math.floor(
      scrollDetails.scrollMaxSize -
        Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) -
        Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2),
    )
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize -
          scrollDetails.offsetEnd -
          virtualScrollSizesAgg.reduce(sumFn, 0),
      )
      return
    }
    let toIndex = 0,
      listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart,
      offset = listOffset
    if (
      listOffset <= listEndOffset &&
      listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value
    ) {
      listOffset -= virtualScrollPaddingBefore.value
      toIndex = virtualScrollSliceRange.value.from
      offset = listOffset
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j]
        toIndex += aggBucketSize
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex]
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++
        offset = listOffset
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset
      }
    }
    setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset)
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === 'string' && align.indexOf('-force') !== -1
    const alignEnd = alignForce === true ? align.replace('-force', '') : align
    const alignRange = alignEnd !== void 0 ? alignEnd : 'start'
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]),
      to = from + virtualScrollSliceSizeComputed.value.total
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total)
    }
    prevScrollStart = scrollDetails.scrollStart
    const rangeChanged =
      from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex)
      return
    }
    const { activeElement } = document
    const contentEl = contentRef.value
    if (
      rangeChanged === true &&
      contentEl !== null &&
      contentEl !== activeElement &&
      contentEl.contains(activeElement) === true
    ) {
      contentEl.addEventListener('focusout', onBlurRefocusFn)
      setTimeout(() => {
        contentEl?.removeEventListener('focusout', onBlurRefocusFn)
      })
    }
    setOverflowAnchor(contentEl, toIndex - from)
    const sizeBefore =
      alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0
    if (rangeChanged === true) {
      const tempTo =
        to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to
          ? virtualScrollSliceRange.value.to
          : to
      virtualScrollSliceRange.value = { from, to: tempTo }
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from)
      virtualScrollPaddingAfter.value = sumSize(
        virtualScrollSizesAgg,
        virtualScrollSizes,
        to,
        virtualScrollLength.value,
      )
      requestAnimationFrame(() => {
        if (
          virtualScrollSliceRange.value.to !== to &&
          prevScrollStart === scrollDetails.scrollStart
        ) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to }
          virtualScrollPaddingAfter.value = sumSize(
            virtualScrollSizesAgg,
            virtualScrollSizes,
            to,
            virtualScrollLength.value,
          )
        }
      })
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) return
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from)
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0),
        posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value,
        posEnd = posStart + virtualScrollSizes[toIndex]
      let scrollPosition = posStart + offset
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore
        const scrollStart = scrollDetails.scrollStart + sizeDiff
        scrollPosition =
          alignForce !== true &&
          scrollStart < posStart &&
          posEnd < scrollStart + scrollDetails.scrollViewSize
            ? scrollStart
            : alignEnd === 'end'
              ? posEnd - scrollDetails.scrollViewSize
              : posStart -
                (alignEnd === 'start'
                  ? 0
                  : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2))
      }
      prevScrollStart = scrollPosition
      setScroll(scrollEl, scrollPosition, props.virtualScrollHorizontal, $q.lang.rtl)
      emitScroll(toIndex)
    })
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value
    if (contentEl) {
      const children = filterProto.call(
          contentEl.children,
          (el) => el.classList && el.classList.contains('q-virtual-scroll--skip') === false,
        ),
        childrenLength = children.length,
        sizeFn =
          props.virtualScrollHorizontal === true
            ? (el) => el.getBoundingClientRect().width
            : (el) => el.offsetHeight
      let index = from,
        size,
        diff
      for (let i = 0; i < childrenLength; ) {
        size = sizeFn(children[i])
        i++
        while (
          i < childrenLength &&
          children[i].classList.contains('q-virtual-scroll--with-prev') === true
        ) {
          size += sizeFn(children[i])
          i++
        }
        diff = size - virtualScrollSizes[index]
        if (diff !== 0) {
          virtualScrollSizes[index] += diff
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff
        }
        index++
      }
    }
  }
  function onBlurRefocusFn() {
    contentRef.value?.focus()
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = []
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length
    virtualScrollSizes.length = virtualScrollLength.value
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize)
    virtualScrollSizesAgg = []
    for (let j = 0; j <= jMax; j++) {
      let size = 0
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value)
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[i]
      }
      virtualScrollSizesAgg.push(size)
    }
    prevToIndex = -1
    prevScrollStart = void 0
    virtualScrollPaddingBefore.value = sumSize(
      virtualScrollSizesAgg,
      virtualScrollSizes,
      0,
      virtualScrollSliceRange.value.from,
    )
    virtualScrollPaddingAfter.value = sumSize(
      virtualScrollSizesAgg,
      virtualScrollSizes,
      virtualScrollSliceRange.value.to,
      virtualScrollLength.value,
    )
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from)
      nextTick(() => {
        scrollTo(toIndex)
      })
    } else {
      onVirtualScrollEvt()
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== 'undefined') {
      const scrollEl = getVirtualScrollTarget()
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd,
        ).scrollViewSize
      }
    }
    localScrollViewSize = scrollViewSize
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter
    const view =
      scrollViewSize === void 0 || scrollViewSize <= 0
        ? 1
        : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value)
    const baseSize = Math.max(
      1,
      view,
      Math.ceil(
        (props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier,
      ),
    )
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view,
    }
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? 'width' : 'height'
    const style = {
      ['--q-virtual-scroll-item-' + paddingSize]: virtualScrollItemSizeComputed.value + 'px',
    }
    return [
      tag === 'tbody'
        ? h(
            tag,
            {
              class: 'q-virtual-scroll__padding',
              key: 'before',
              ref: beforeRef,
            },
            [
              h('tr', [
                h('td', {
                  style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
                  colspan: colspanAttr.value,
                }),
              ]),
            ],
          )
        : h(tag, {
            class: 'q-virtual-scroll__padding',
            key: 'before',
            ref: beforeRef,
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
          }),
      h(
        tag,
        {
          class: 'q-virtual-scroll__content',
          key: 'content',
          ref: contentRef,
          tabindex: -1,
        },
        content.flat(),
      ),
      tag === 'tbody'
        ? h(
            tag,
            {
              class: 'q-virtual-scroll__padding',
              key: 'after',
              ref: afterRef,
            },
            [
              h('tr', [
                h('td', {
                  style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
                  colspan: colspanAttr.value,
                }),
              ]),
            ],
          )
        : h(tag, {
            class: 'q-virtual-scroll__padding',
            key: 'after',
            ref: afterRef,
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
          }),
    ]
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 &&
        emit('virtualScroll', {
          index,
          from: virtualScrollSliceRange.value.from,
          to: virtualScrollSliceRange.value.to - 1,
          direction: index < prevToIndex ? 'decrease' : 'increase',
          ref: proxy,
        })
      prevToIndex = index
    }
  }
  setVirtualScrollSize()
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35,
  )
  onBeforeMount(() => {
    setVirtualScrollSize()
  })
  let shouldActivate = false
  onDeactivated(() => {
    shouldActivate = true
  })
  onActivated(() => {
    if (shouldActivate !== true) return
    const scrollEl = getVirtualScrollTarget()
    if (
      prevScrollStart !== void 0 &&
      scrollEl !== void 0 &&
      scrollEl !== null &&
      scrollEl.nodeType !== 8
    ) {
      setScroll(scrollEl, prevScrollStart, props.virtualScrollHorizontal, $q.lang.rtl)
    } else {
      scrollTo(prevToIndex)
    }
  })
  onBeforeUnmount(() => {
    onVirtualScrollEvt.cancel()
  })
  Object.assign(proxy, { scrollTo, reset, refresh })
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh,
  }
}
const comps = {
  list: QList,
  table: QMarkupTable,
}
const typeOptions = ['list', 'table', '__qtable']
const QVirtualScroll = createComponent({
  name: 'QVirtualScroll',
  props: {
    ...useVirtualScrollProps,
    type: {
      type: String,
      default: 'list',
      validator: (v) => typeOptions.includes(v),
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: scrollTargetProp,
  },
  setup(props, { slots, attrs }) {
    let localScrollTarget
    const rootRef = ref(null)
    const virtualScrollLength = computed(() =>
      props.itemsSize >= 0 && props.itemsFn !== void 0
        ? parseInt(props.itemsSize, 10)
        : Array.isArray(props.items)
          ? props.items.length
          : 0,
    )
    const {
      virtualScrollSliceRange,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
    })
    const virtualScrollScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return []
      }
      const mapFn = (item, i) => ({
        index: virtualScrollSliceRange.value.from + i,
        item,
      })
      return props.itemsFn === void 0
        ? props.items
            .slice(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to)
            .map(mapFn)
        : props
            .itemsFn(
              virtualScrollSliceRange.value.from,
              virtualScrollSliceRange.value.to - virtualScrollSliceRange.value.from,
            )
            .map(mapFn)
    })
    const classes = computed(
      () =>
        'q-virtual-scroll q-virtual-scroll' +
        (props.virtualScrollHorizontal === true ? '--horizontal' : '--vertical') +
        (props.scrollTarget !== void 0 ? '' : ' scroll'),
    )
    const attributes = computed(() => (props.scrollTarget !== void 0 ? {} : { tabindex: 0 }))
    watch(virtualScrollLength, () => {
      localResetVirtualScroll()
    })
    watch(
      () => props.scrollTarget,
      () => {
        unconfigureScrollTarget()
        configureScrollTarget()
      },
    )
    function getVirtualScrollEl() {
      return rootRef.value.$el || rootRef.value
    }
    function getVirtualScrollTarget() {
      return localScrollTarget
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(getVirtualScrollEl(), props.scrollTarget)
      localScrollTarget.addEventListener('scroll', onVirtualScrollEvt, listenOpts.passive)
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener('scroll', onVirtualScrollEvt, listenOpts.passive)
        localScrollTarget = void 0
      }
    }
    function __getVirtualChildren() {
      let child = padVirtualScroll(
        props.type === 'list' ? 'div' : 'tbody',
        virtualScrollScope.value.map(slots.default),
      )
      if (slots.before !== void 0) {
        child = slots.before().concat(child)
      }
      return hMergeSlot(slots.after, child)
    }
    onBeforeMount(() => {
      localResetVirtualScroll()
    })
    onMounted(() => {
      configureScrollTarget()
    })
    onActivated(() => {
      configureScrollTarget()
    })
    onDeactivated(() => {
      unconfigureScrollTarget()
    })
    onBeforeUnmount(() => {
      unconfigureScrollTarget()
    })
    return () => {
      if (slots.default === void 0) {
        console.error('QVirtualScroll: default scoped slot is required for rendering')
        return
      }
      return props.type === '__qtable'
        ? getTableMiddle(
            { ref: rootRef, class: 'q-table__middle ' + classes.value },
            __getVirtualChildren(),
          )
        : h(
            comps[props.type],
            {
              ...attrs,
              ref: rootRef,
              class: [attrs.class, classes.value],
              ...attributes.value,
            },
            __getVirtualChildren,
          )
    }
  },
})
const QField = createComponent({
  name: 'QField',
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    tag: {
      type: String,
      default: 'label',
    },
  },
  emits: useFieldEmits,
  setup() {
    return useField(useFieldState({ tagProp: true }))
  },
})
const defaultSizes$1 = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24,
}
const QChip = createComponent({
  name: 'QChip',
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Boolean,
      default: null,
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true,
    },
  },
  emits: ['update:modelValue', 'update:selected', 'remove', 'click'],
  setup(props, { slots, emit }) {
    const {
      proxy: { $q },
    } = getCurrentInstance()
    const isDark = useDark(props, $q)
    const sizeStyle = useSize(props, defaultSizes$1)
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0)
    const leftIcon = computed(() =>
      props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon,
    )
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove)
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null),
    )
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor
      return (
        'q-chip row inline no-wrap items-center' +
        (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : '') +
        (text ? ` text-${text} q-chip--colored` : '') +
        (props.disable === true ? ' disabled' : '') +
        (props.dense === true ? ' q-chip--dense' : '') +
        (props.outline === true ? ' q-chip--outline' : '') +
        (props.selected === true ? ' q-chip--selected' : '') +
        (isClickable.value === true
          ? ' q-chip--clickable cursor-pointer non-selectable q-hoverable'
          : '') +
        (props.square === true ? ' q-chip--square' : '') +
        (isDark.value === true ? ' q-chip--dark q-dark' : '')
      )
    })
    const attributes = computed(() => {
      const chip =
        props.disable === true
          ? { tabindex: -1, 'aria-disabled': 'true' }
          : { tabindex: props.tabindex || 0 }
      const remove = {
        ...chip,
        role: 'button',
        'aria-hidden': 'false',
        'aria-label': props.removeAriaLabel || $q.lang.label.remove,
      }
      return { chip, remove }
    })
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e)
    }
    function onClick(e) {
      if (!props.disable) {
        emit('update:selected', !props.selected)
        emit('click', e)
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e)
        if (props.disable === false) {
          emit('update:modelValue', false)
          emit('remove')
        }
      }
    }
    function getContent() {
      const child = []
      isClickable.value === true && child.push(h('div', { class: 'q-focus-helper' }))
      hasLeftIcon.value === true &&
        child.push(
          h(QIcon, {
            class: 'q-chip__icon q-chip__icon--left',
            name: leftIcon.value,
          }),
        )
      const label =
        props.label !== void 0 ? [h('div', { class: 'ellipsis' }, [props.label])] : void 0
      child.push(
        h(
          'div',
          {
            class: 'q-chip__content col row no-wrap items-center q-anchor--skip',
          },
          hMergeSlotSafely(slots.default, label),
        ),
      )
      props.iconRight &&
        child.push(
          h(QIcon, {
            class: 'q-chip__icon q-chip__icon--right',
            name: props.iconRight,
          }),
        )
      props.removable === true &&
        child.push(
          h(QIcon, {
            class: 'q-chip__icon q-chip__icon--remove cursor-pointer',
            name: removeIcon.value,
            ...attributes.value.remove,
            onClick: onRemove,
            onKeyup: onRemove,
          }),
        )
      return child
    }
    return () => {
      if (props.modelValue === false) return
      const data = {
        class: classes.value,
        style: sizeStyle.value,
      }
      isClickable.value === true && Object.assign(data, attributes.value.chip, { onClick, onKeyup })
      return hDir(
        'div',
        data,
        getContent(),
        'ripple',
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]],
      )
    }
  },
})
const QItem = createComponent({
  name: 'QItem',
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: 'div',
    },
    active: {
      type: Boolean,
      default: null,
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean,
  },
  emits: ['click', 'keyup'],
  setup(props, { slots, emit }) {
    const {
      proxy: { $q },
    } = getCurrentInstance()
    const isDark = useDark(props, $q)
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink()
    const rootRef = ref(null)
    const blurTargetRef = ref(null)
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === 'label',
    )
    const isClickable = computed(() => props.disable !== true && isActionable.value === true)
    const classes = computed(
      () =>
        'q-item q-item-type row no-wrap' +
        (props.dense === true ? ' q-item--dense' : '') +
        (isDark.value === true ? ' q-item--dark' : '') +
        (hasLink.value === true && props.active === null
          ? linkClass.value
          : props.active === true
            ? ` q-item--active${props.activeClass !== void 0 ? ` ${props.activeClass}` : ''}`
            : '') +
        (props.disable === true ? ' disabled' : '') +
        (isClickable.value === true
          ? ' q-item--clickable q-link cursor-pointer ' +
            (props.manualFocus === true ? 'q-manual-focusable' : 'q-focusable q-hoverable') +
            (props.focused === true ? ' q-manual-focusable--focused' : '')
          : ''),
    )
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null
      }
      const dir = $q.lang.rtl === true ? 'Right' : 'Left'
      return {
        ['padding' + dir]: 16 + props.insetLevel * 56 + 'px',
      }
    })
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null && e.qAvoidFocus !== true) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus()
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus()
          }
        }
        navigateOnClick(e)
      }
    }
    function onKeyup(e) {
      if (isClickable.value === true && isKeyCode(e, [13, 32]) === true) {
        stopAndPrevent(e)
        e.qKeyEvent = true
        const evt = new MouseEvent('click', e)
        evt.qKeyEvent = true
        rootRef.value.dispatchEvent(evt)
      }
      emit('keyup', e)
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, [])
      isClickable.value === true &&
        child.unshift(h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef }))
      return child
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: 'listitem',
        onClick,
        onKeyup,
      }
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || '0'
        Object.assign(data, linkAttrs.value)
      } else if (isActionable.value === true) {
        data['aria-disabled'] = 'true'
      }
      return h(linkTag.value, data, getContent())
    }
  },
})
const QItemSection = createComponent({
  name: 'QItemSection',
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean,
  },
  setup(props, { slots }) {
    const classes = computed(
      () =>
        `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? 'side' : 'main'}` +
        (props.top === true ? ' q-item__section--top justify-start' : ' justify-center') +
        (props.avatar === true ? ' q-item__section--avatar' : '') +
        (props.thumbnail === true ? ' q-item__section--thumbnail' : '') +
        (props.noWrap === true ? ' q-item__section--nowrap' : ''),
    )
    return () => h('div', { class: classes.value }, hSlot(slots.default))
  },
})
const QItemLabel = createComponent({
  name: 'QItemLabel',
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String],
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10))
    const classes = computed(
      () =>
        'q-item__label' +
        (props.overline === true ? ' q-item__label--overline text-overline' : '') +
        (props.caption === true ? ' q-item__label--caption text-caption' : '') +
        (props.header === true ? ' q-item__label--header' : '') +
        (parsedLines.value === 1 ? ' ellipsis' : ''),
    )
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1
        ? {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': parsedLines.value,
          }
        : null
    })
    return () =>
      h(
        'div',
        {
          style: style.value,
          class: classes.value,
        },
        hSlot(slots.default),
      )
  },
})
const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: {
    type: [Boolean, String, Element],
    default: true,
  },
  noParentEvent: Boolean,
}
const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean,
}
function useAnchor({
  showing,
  avoidEmit,
  // required for QPopupProxy (true)
  configureAnchorEl,
  // optional
}) {
  const { props, proxy, emit } = getCurrentInstance()
  const anchorEl = ref(null)
  let touchTimer = null
  function canShow(evt) {
    return anchorEl.value === null
      ? false
      : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1
  }
  const anchorEvents = {}
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt)
      },
      toggle(evt) {
        proxy.toggle(evt)
        evt.qAnchorHandled = true
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt)
      },
      contextClick(evt) {
        proxy.hide(evt)
        prevent(evt)
        nextTick(() => {
          proxy.show(evt)
          evt.qAnchorHandled = true
        })
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt)
        if (canShow(evt) !== true) return
        proxy.hide(evt)
        anchorEl.value.classList.add('non-selectable')
        const target = evt.target
        addEvt(anchorEvents, 'anchor', [
          [target, 'touchmove', 'mobileCleanup', 'passive'],
          [target, 'touchend', 'mobileCleanup', 'passive'],
          [target, 'touchcancel', 'mobileCleanup', 'passive'],
          [anchorEl.value, 'contextmenu', 'prevent', 'notPassive'],
        ])
        touchTimer = setTimeout(() => {
          touchTimer = null
          proxy.show(evt)
          evt.qAnchorHandled = true
        }, 300)
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove('non-selectable')
        if (touchTimer !== null) {
          clearTimeout(touchTimer)
          touchTimer = null
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection()
        }
      },
    })
    configureAnchorEl = function (context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return
      let evts
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [[anchorEl.value, 'touchstart', 'mobileTouch', 'passive']]
        } else {
          evts = [
            [anchorEl.value, 'mousedown', 'hide', 'passive'],
            [anchorEl.value, 'contextmenu', 'contextClick', 'notPassive'],
          ]
        }
      } else {
        evts = [
          [anchorEl.value, 'click', 'toggle', 'passive'],
          [anchorEl.value, 'keyup', 'toggleKey', 'passive'],
        ]
      }
      addEvt(anchorEvents, 'anchor', evts)
    }
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, 'anchor')
  }
  function setAnchorEl(el) {
    anchorEl.value = el
    while (anchorEl.value.classList.contains('q-anchor--skip')) {
      anchorEl.value = anchorEl.value.parentNode
    }
    configureAnchorEl()
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === '' || proxy.$el.parentNode === null) {
      anchorEl.value = null
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode)
    } else {
      let el = props.target
      if (typeof props.target === 'string') {
        try {
          el = document.querySelector(props.target)
        } catch (err) {
          el = void 0
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el
        configureAnchorEl()
      } else {
        anchorEl.value = null
        console.error(`Anchor: target "${props.target}" not found`)
      }
    }
  }
  watch(
    () => props.contextMenu,
    (val) => {
      if (anchorEl.value !== null) {
        unconfigureAnchorEl()
        configureAnchorEl(val)
      }
    },
  )
  watch(
    () => props.target,
    () => {
      if (anchorEl.value !== null) {
        unconfigureAnchorEl()
      }
      pickAnchorEl()
    },
  )
  watch(
    () => props.noParentEvent,
    (val) => {
      if (anchorEl.value !== null) {
        if (val === true) {
          unconfigureAnchorEl()
        } else {
          configureAnchorEl()
        }
      }
    },
  )
  onMounted(() => {
    pickAnchorEl()
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit('update:modelValue', false)
    }
  })
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer)
    unconfigureAnchorEl()
  })
  return {
    anchorEl,
    canShow,
    anchorEvents,
  }
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null)
  let scrollFn
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? 'add' : 'remove'}EventListener`
    const fnHandler = fn !== void 0 ? fn : scrollFn
    if (scrollTarget !== window) {
      scrollTarget[fnProp]('scroll', fnHandler, listenOpts.passive)
    }
    window[fnProp]('scroll', fnHandler, listenOpts.passive)
    scrollFn = fn
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value)
      localScrollTarget.value = null
    }
  }
  const noParentEventWatcher = watch(
    () => props.noParentEvent,
    () => {
      if (localScrollTarget.value !== null) {
        unconfigureScrollTarget()
        configureScrollTarget()
      }
    },
  )
  onBeforeUnmount(noParentEventWatcher)
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent,
  }
}
const { notPassiveCapture } = listenOpts,
  registeredList = []
function globalHandler(evt) {
  const target = evt.target
  if (
    target === void 0 ||
    target.nodeType === 8 ||
    target.classList.contains('no-pointer-events') === true
  )
    return
  let portalIndex = portalProxyList.length - 1
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$
    if (proxy.type.name === 'QTooltip') {
      portalIndex--
      continue
    }
    if (proxy.type.name !== 'QDialog') {
      break
    }
    if (proxy.props.seamless !== true) return
    portalIndex--
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i]
    if (
      (state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) &&
      (target === document.body ||
        (state.innerRef.value !== null && state.innerRef.value.contains(target) === false))
    ) {
      evt.qClickOutside = true
      state.onClickOutside(evt)
    } else {
      return
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps)
  if (registeredList.length === 1) {
    document.addEventListener('mousedown', globalHandler, notPassiveCapture)
    document.addEventListener('touchstart', globalHandler, notPassiveCapture)
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps)
  if (index !== -1) {
    registeredList.splice(index, 1)
    if (registeredList.length === 0) {
      document.removeEventListener('mousedown', globalHandler, notPassiveCapture)
      document.removeEventListener('touchstart', globalHandler, notPassiveCapture)
    }
  }
}
let vpLeft, vpTop
function validatePosition(pos) {
  const parts = pos.split(' ')
  if (parts.length !== 2) {
    return false
  }
  if (['top', 'center', 'bottom'].includes(parts[0]) !== true) {
    console.error('Anchor/Self position must start with one of top/center/bottom')
    return false
  }
  if (['left', 'middle', 'right', 'start', 'end'].includes(parts[1]) !== true) {
    console.error('Anchor/Self position must end with one of left/middle/right/start/end')
    return false
  }
  return true
}
function validateOffset(val) {
  if (!val) {
    return true
  }
  if (val.length !== 2) {
    return false
  }
  if (typeof val[0] !== 'number' || typeof val[1] !== 'number') {
    return false
  }
  return true
}
const horizontalPos = {
  'start#ltr': 'left',
  'start#rtl': 'right',
  'end#ltr': 'right',
  'end#rtl': 'left',
}
;['left', 'middle', 'right'].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos
  horizontalPos[`${pos}#rtl`] = pos
})
function parsePosition(pos, rtl) {
  const parts = pos.split(' ')
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? 'rtl' : 'ltr'}`],
  }
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width: width2, height } = el.getBoundingClientRect()
  if (offset !== void 0) {
    top -= offset[1]
    left -= offset[0]
    bottom += offset[1]
    right += offset[0]
    width2 += offset[0]
    height += offset[1]
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width: width2,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2,
  }
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect()
  top += absoluteOffset.top
  left += absoluteOffset.left
  if (offset !== void 0) {
    top += offset[1]
    left += offset[0]
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top,
  }
}
function getTargetProps(width2, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width2 / 2,
    right: width2,
  }
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal],
  }
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) return
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1)
    }, 10)
    return
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth,
  } = cfg
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style
    const { offsetLeft: left, offsetTop: top } = window.visualViewport
    if (left !== vpLeft) {
      el.setProperty('--q-pe-left', left + 'px')
      vpLeft = left
    }
    if (top !== vpTop) {
      el.setProperty('--q-pe-top', top + 'px')
      vpTop = top
    }
  }
  const { scrollLeft, scrollTop } = targetEl
  const anchorProps =
    absoluteOffset === void 0
      ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset)
      : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset)
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: 'visible',
  })
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl
  const { elWidth, elHeight } =
    fit === true || cover === true
      ? {
          elWidth: Math.max(anchorProps.width, origElWidth),
          elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight,
        }
      : { elWidth: origElWidth, elHeight: origElHeight }
  let elStyle = { maxWidth, maxHeight }
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + 'px'
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + 'px'
    }
  }
  Object.assign(targetEl.style, elStyle)
  const targetProps = getTargetProps(elWidth, elHeight)
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin)
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin)
  } else {
    const { top, left } = props
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin)
    let hasChanged = false
    if (props.top !== top) {
      hasChanged = true
      const offsetY = 2 * offset[1]
      anchorProps.center = anchorProps.top -= offsetY
      anchorProps.bottom -= offsetY + 2
    }
    if (props.left !== left) {
      hasChanged = true
      const offsetX = 2 * offset[0]
      anchorProps.middle = anchorProps.left -= offsetX
      anchorProps.right -= offsetX + 2
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin)
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin)
    }
  }
  elStyle = {
    top: props.top + 'px',
    left: props.left + 'px',
  }
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + 'px'
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + 'px'
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth
    }
  }
  Object.assign(targetEl.style, elStyle)
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom,
    currentWidth = targetProps.right,
    margin = getScrollbarWidth(),
    innerHeight = window.innerHeight - margin,
    innerWidth = document.body.clientWidth
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === 'center') {
      props.top =
        anchorProps[anchorOrigin.vertical] > innerHeight / 2
          ? Math.max(0, innerHeight - currentHeight)
          : 0
      props.maxHeight = Math.min(currentHeight, innerHeight)
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === 'center'
          ? anchorProps.center
          : anchorOrigin.vertical === selfOrigin.vertical
            ? anchorProps.bottom
            : anchorProps.top,
      )
      props.maxHeight = Math.min(currentHeight, anchorY)
      props.top = Math.max(0, anchorY - currentHeight)
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === 'center'
          ? anchorProps.center
          : anchorOrigin.vertical === selfOrigin.vertical
            ? anchorProps.top
            : anchorProps.bottom,
      )
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top)
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth)
    if (selfOrigin.horizontal === 'middle') {
      props.left =
        anchorProps[anchorOrigin.horizontal] > innerWidth / 2
          ? Math.max(0, innerWidth - currentWidth)
          : 0
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === 'middle'
          ? anchorProps.middle
          : anchorOrigin.horizontal === selfOrigin.horizontal
            ? anchorProps.right
            : anchorProps.left,
      )
      props.maxWidth = Math.min(currentWidth, anchorX)
      props.left = Math.max(0, anchorX - props.maxWidth)
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === 'middle'
          ? anchorProps.middle
          : anchorOrigin.horizontal === selfOrigin.horizontal
            ? anchorProps.left
            : anchorProps.right,
      )
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left)
    }
  }
}
const QMenu = createComponent({
  name: 'QMenu',
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noEscDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition,
    },
    self: {
      type: String,
      validator: validatePosition,
    },
    offset: {
      type: Array,
      validator: validateOffset,
    },
    scrollTarget: scrollTargetProp,
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null,
    },
    maxWidth: {
      type: String,
      default: null,
    },
  },
  emits: [...useModelToggleEmits, 'click', 'escapeKey'],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null,
      absoluteOffset,
      unwatchPosition,
      avoidAutoClose
    const vm = getCurrentInstance()
    const { proxy } = vm
    const { $q } = proxy
    const innerRef = ref(null)
    const showing = ref(false)
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true,
    )
    const isDark = useDark(props, $q)
    const { registerTick, removeTick } = useTick()
    const { registerTimeout } = useTimeout()
    const { transitionProps, transitionStyle } = useTransition(props)
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(
      props,
      configureScrollTarget,
    )
    const { anchorEl, canShow } = useAnchor({ showing })
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true,
    })
    const { showPortal, hidePortal, renderPortal } = usePortal(
      vm,
      innerRef,
      renderPortalContent,
      'menu',
    )
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e)
          if (
            // always prevent touch event
            e.type === 'touchstart' ||
            e.target.classList.contains('q-dialog__backdrop')
          ) {
            stopAndPrevent(e)
          }
          return true
        }
      },
    }
    const anchorOrigin = computed(() =>
      parsePosition(
        props.anchor || (props.cover === true ? 'center middle' : 'bottom start'),
        $q.lang.rtl,
      ),
    )
    const selfOrigin = computed(() =>
      props.cover === true
        ? anchorOrigin.value
        : parsePosition(props.self || 'top start', $q.lang.rtl),
    )
    const menuClass = computed(
      () =>
        (props.square === true ? ' q-menu--square' : '') +
        (isDark.value === true ? ' q-menu--dark q-dark' : ''),
    )
    const onEvents = computed(() => (props.autoClose === true ? { onClick: onAutoClose } : {}))
    const handlesFocus = computed(() => showing.value === true && props.persistent !== true)
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey)
        addClickOutside(clickOutsideProps)
      } else {
        removeEscapeKey(onEscapeKey)
        removeClickOutside(clickOutsideProps)
      }
    })
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value
        if (node && node.contains(document.activeElement) !== true) {
          node =
            node.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]') ||
            node.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]') ||
            node.querySelector('[autofocus], [data-autofocus]') ||
            node
          node.focus({ preventScroll: true })
        }
      })
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null
      addFocusout(onFocusout)
      showPortal()
      configureScrollTarget()
      absoluteOffset = void 0
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt)
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect()
          absoluteOffset = { left: pos.left - left, top: pos.top - top }
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () =>
            $q.screen.width +
            '|' +
            $q.screen.height +
            '|' +
            props.self +
            '|' +
            props.anchor +
            '|' +
            $q.lang.rtl,
          updatePosition,
        )
      }
      if (props.noFocus !== true) {
        document.activeElement.blur()
      }
      registerTick(() => {
        updatePosition()
        props.noFocus !== true && focus()
      })
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose
          innerRef.value.click()
        }
        updatePosition()
        showPortal(true)
        emit('show', evt)
      }, props.transitionDuration)
    }
    function handleHide(evt) {
      removeTick()
      hidePortal()
      anchorCleanup(true)
      if (
        refocusTarget !== null && // menu was hidden from code or ESC plugin
        (evt === void 0 || evt.qClickOutside !== true)
      ) {
        ;(
          (evt?.type.indexOf('key') === 0
            ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])')
            : void 0) || refocusTarget
        ).focus()
        refocusTarget = null
      }
      registerTimeout(() => {
        hidePortal(true)
        emit('hide', evt)
      }, props.transitionDuration)
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0
      if (unwatchPosition !== void 0) {
        unwatchPosition()
        unwatchPosition = void 0
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout)
        unconfigureScrollTarget()
        removeClickOutside(clickOutsideProps)
        removeEscapeKey(onEscapeKey)
      }
      if (hiding !== true) {
        refocusTarget = null
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget)
        changeScrollEvent(localScrollTarget.value, updatePosition)
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e)
        emit('click', e)
      } else {
        avoidAutoClose = false
      }
    }
    function onFocusout(evt) {
      if (
        handlesFocus.value === true &&
        props.noFocus !== true &&
        childHasFocus(innerRef.value, evt.target) !== true
      ) {
        focus()
      }
    }
    function onEscapeKey(evt) {
      if (props.noEscDismiss !== true) {
        emit('escapeKey')
        hide(evt)
      }
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
      })
    }
    function renderPortalContent() {
      return h(Transition, transitionProps.value, () =>
        showing.value === true
          ? h(
              'div',
              {
                role: 'menu',
                ...attrs,
                ref: innerRef,
                tabindex: -1,
                class: ['q-menu q-position-engine scroll' + menuClass.value, attrs.class],
                style: [attrs.style, transitionStyle.value],
                ...onEvents.value,
              },
              hSlot(slots.default),
            )
          : null,
      )
    }
    onBeforeUnmount(anchorCleanup)
    Object.assign(proxy, { focus, updatePosition })
    return renderPortal
  },
})
const validateNewValueMode = (v) => ['add', 'add-unique', 'toggle'].includes(v)
const reEscapeList = '.*+?^${}()|[]\\'
const fieldPropsList = Object.keys(useFieldProps)
function getPropValueFn(userPropName, defaultPropName) {
  if (typeof userPropName === 'function') return userPropName
  const propName = userPropName !== void 0 ? userPropName : defaultPropName
  return (opt) => (opt !== null && typeof opt === 'object' && propName in opt ? opt[propName] : opt)
}
const QSelect = createComponent({
  name: 'QSelect',
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    // override of useFieldProps > modelValue
    modelValue: {
      required: true,
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => [],
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null,
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    popupNoRouteDismiss: Boolean,
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode,
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    disableTabSelection: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500,
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0,
    },
    autocomplete: String,
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {
      type: String,
      validator: (v) => ['default', 'menu', 'dialog'].includes(v),
      default: 'default',
    },
    // override of useVirtualScrollProps > virtualScrollItemSize (no default)
    virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,
    onNewValue: Function,
    onFilter: Function,
  },
  emits: [
    ...useFieldEmits,
    'add',
    'remove',
    'inputValue',
    'keyup',
    'keypress',
    'keydown',
    'popupShow',
    'popupHide',
    'filterAbort',
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance()
    const { $q } = proxy
    const menu = ref(false)
    const dialog = ref(false)
    const optionIndex = ref(-1)
    const inputValue = ref('')
    const dialogFieldFocused = ref(false)
    const innerLoadingIndicator = ref(false)
    let filterTimer = null,
      inputValueTimer = null,
      innerValueCache,
      hasDialog,
      userInputValue,
      filterId = null,
      defaultInputValue,
      transitionShowComputed,
      searchBuffer,
      searchBufferExp
    const inputRef = ref(null)
    const targetRef = ref(null)
    const menuRef = ref(null)
    const dialogRef = ref(null)
    const menuContentRef = ref(null)
    const nameProp = useFormInputNameAttr(props)
    const onComposition = useKeyComposition(onInput)
    const virtualScrollLength = computed(() =>
      Array.isArray(props.options) ? props.options.length : 0,
    )
    const virtualScrollItemSizeComputed = computed(() =>
      props.virtualScrollItemSize === void 0
        ? props.optionsDense === true
          ? 24
          : 48
        : props.virtualScrollItemSize,
    )
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize,
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed,
    })
    const state = useFieldState()
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true,
        val =
          props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true)
            ? props.multiple === true && Array.isArray(props.modelValue)
              ? props.modelValue
              : [props.modelValue]
            : []
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : []
        const values = val.map((v) => getOption(v, cache))
        return props.modelValue === null && mapNull === true
          ? values.filter((v) => v !== null)
          : values
      }
      return val
    })
    const innerFieldProps = computed(() => {
      const acc = {}
      fieldPropsList.forEach((key) => {
        const val = props[key]
        if (val !== void 0) {
          acc[key] = val
        }
      })
      return acc
    })
    const isOptionsDark = computed(() =>
      props.optionsDark === null ? state.isDark.value : props.optionsDark,
    )
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value))
    const computedInputClass = computed(() => {
      let cls = 'q-field__input q-placeholder col'
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass]
      }
      cls += ' q-field__input--padding'
      return props.inputClass === void 0 ? cls : [cls, props.inputClass]
    })
    const menuContentClass = computed(
      () =>
        (props.virtualScrollHorizontal === true ? 'q-virtual-scroll--horizontal' : '') +
        (props.popupContentClass ? ' ' + props.popupContentClass : ''),
    )
    const noOptions = computed(() => virtualScrollLength.value === 0)
    const selectedString = computed(() =>
      innerValue.value.map((opt) => getOptionLabel.value(opt)).join(', '),
    )
    const ariaCurrentValue = computed(() =>
      props.displayValue !== void 0 ? props.displayValue : selectedString.value,
    )
    const needsHtmlFn = computed(() =>
      props.optionsHtml === true ? () => true : (opt) => opt?.html === true,
    )
    const valueAsHtml = computed(
      () =>
        props.displayValueHtml === true ||
        (props.displayValue === void 0 &&
          (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value))),
    )
    const tabindex = computed(() => (state.focused.value === true ? props.tabindex : -1))
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: 'combobox',
        'aria-label': props.label,
        'aria-readonly': props.readonly === true ? 'true' : 'false',
        'aria-autocomplete': props.useInput === true ? 'list' : 'none',
        'aria-expanded': menu.value === true ? 'true' : 'false',
        'aria-controls': `${state.targetUid.value}_lb`,
      }
      if (optionIndex.value >= 0) {
        attrs['aria-activedescendant'] = `${state.targetUid.value}_${optionIndex.value}`
      }
      return attrs
    })
    const listboxAttrs = computed(() => ({
      id: `${state.targetUid.value}_lb`,
      role: 'listbox',
      'aria-multiselectable': props.multiple === true ? 'true' : 'false',
    }))
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value,
      }))
    })
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return []
      }
      const { from, to } = virtualScrollSliceRange.value
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true
        const active = isOptionSelected(opt) === true
        const index = from + i
        const itemProps = {
          clickable: true,
          active,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: 'option',
          'aria-selected': active === true ? 'true' : 'false',
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt)
          },
        }
        if (disable !== true) {
          optionIndex.value === index && (itemProps.focused = true)
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index)
            }
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps,
        }
      })
    })
    const dropdownArrowIcon = computed(() =>
      props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown,
    )
    const squaredMenu = computed(
      () =>
        props.optionsCover === false &&
        props.outlined !== true &&
        props.standout !== true &&
        props.borderless !== true &&
        props.rounded !== true,
    )
    const computedOptionsSelectedClass = computed(() =>
      props.optionsSelectedClass !== void 0
        ? props.optionsSelectedClass
        : props.color !== void 0
          ? `text-${props.color}`
          : '',
    )
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, 'value'))
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, 'label'))
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, 'disable'))
    const innerOptionsValue = computed(() => innerValue.value.map(getOptionValue.value))
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e)
        },
      }
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition
      return evt
    })
    watch(
      innerValue,
      (val) => {
        innerValueCache = val
        if (
          props.useInput === true &&
          props.fillInput === true &&
          props.multiple !== true &&
          state.innerLoading.value !== true &&
          ((dialog.value !== true && menu.value !== true) || hasValue.value !== true)
        ) {
          userInputValue !== true && resetInputValue()
          if (dialog.value === true || menu.value === true) {
            filter('')
          }
        }
      },
      { immediate: true },
    )
    watch(() => props.fillInput, resetInputValue)
    watch(menu, updateMenu)
    watch(virtualScrollLength, rerenderMenu)
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt
    }
    function removeAtIndex(index) {
      if (index !== -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice()
          emit('remove', { index, value: model.splice(index, 1)[0] })
          emit('update:modelValue', model)
        } else {
          emit('update:modelValue', null)
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index)
      state.focus()
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt)
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(getOptionLabel.value(opt), true, true)
        emit('update:modelValue', val)
        return
      }
      if (innerValue.value.length === 0) {
        emit('add', { index: 0, value: val })
        emit('update:modelValue', props.multiple === true ? [val] : val)
        return
      }
      if (unique === true && isOptionSelected(opt) === true) return
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) return
      const model = props.modelValue.slice()
      emit('add', { index: model.length, value: val })
      model.push(val)
      emit('update:modelValue', model)
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true)
        return
      const optValue = getOptionValue.value(opt)
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(props.fillInput === true ? getOptionLabel.value(opt) : '', true, true)
          hidePopup()
        }
        targetRef.value?.focus()
        if (
          innerValue.value.length === 0 ||
          isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true
        ) {
          emit('update:modelValue', props.emitValue === true ? optValue : opt)
        }
        return
      }
      if (hasDialog !== true || dialogFieldFocused.value === true) {
        state.focus()
      }
      selectInputText()
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt
        emit('add', { index: 0, value: val })
        emit('update:modelValue', props.multiple === true ? [val] : val)
        return
      }
      const model = props.modelValue.slice(),
        index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue))
      if (index !== -1) {
        emit('remove', { index, value: model.splice(index, 1)[0] })
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) return
        const val = props.emitValue === true ? optValue : opt
        emit('add', { index: model.length, value: val })
        model.push(val)
      }
      emit('update:modelValue', model)
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) return
      const val = index !== -1 && index < virtualScrollLength.value ? index : -1
      if (optionIndex.value !== val) {
        optionIndex.value = val
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value
        do {
          index = normalizeToInterval(index + offset, -1, virtualScrollLength.value - 1)
        } while (
          index !== -1 &&
          index !== optionIndex.value &&
          isOptionDisabled.value(props.options[index]) === true
        )
        if (optionIndex.value !== index) {
          setOptionIndex(index)
          scrollTo(index)
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue,
              true,
            )
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value)
      return props.options.find(fn) || valueCache.find(fn) || value
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt)
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0
    }
    function selectInputText(e) {
      if (
        props.useInput === true &&
        targetRef.value !== null &&
        (e === void 0 || (targetRef.value === e.target && e.target.value === selectedString.value))
      ) {
        targetRef.value.select()
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e)
        hidePopup()
        resetInputValue()
      }
      emit('keyup', e)
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target
      if (e.keyCode !== void 0) {
        onTargetKeyup(e)
        return
      }
      e.target.value = ''
      if (filterTimer !== null) {
        clearTimeout(filterTimer)
        filterTimer = null
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer)
        inputValueTimer = null
      }
      resetInputValue()
      if (typeof value === 'string' && value.length !== 0) {
        const needle = value.toLocaleLowerCase()
        const findFn = (extractFn) => {
          const option = props.options.find(
            (opt) => String(extractFn.value(opt)).toLocaleLowerCase() === needle,
          )
          if (option === void 0) return false
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option)
          } else {
            hidePopup()
          }
          return true
        }
        const fillFn = (afterFilter) => {
          if (
            findFn(getOptionValue) !== true &&
            afterFilter !== true &&
            findFn(getOptionLabel) !== true
          ) {
            filter(value, true, () => fillFn(true))
          }
        }
        fillFn()
      } else {
        state.clearValue(e)
      }
    }
    function onTargetKeypress(e) {
      emit('keypress', e)
    }
    function onTargetKeydown(e) {
      emit('keydown', e)
      if (shouldIgnoreKey(e) === true) return
      const newValueModeValid =
        inputValue.value.length !== 0 &&
        (props.newValueMode !== void 0 || props.onNewValue !== void 0)
      const tabShouldSelect =
        e.shiftKey !== true &&
        props.disableTabSelection !== true &&
        props.multiple !== true &&
        (optionIndex.value !== -1 || newValueModeValid === true)
      if (e.keyCode === 27) {
        prevent(e)
        return
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu()
        return
      }
      if (
        e.target === void 0 ||
        e.target.id !== state.targetUid.value ||
        state.editable.value !== true
      )
        return
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e)
        showPopup()
        return
      }
      if (
        e.keyCode === 8 &&
        (props.useChips === true || props.clearable === true) &&
        props.hideSelected !== true &&
        inputValue.value.length === 0
      ) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1)
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit('update:modelValue', null)
        }
        return
      }
      if (
        (e.keyCode === 35 || e.keyCode === 36) &&
        (typeof inputValue.value !== 'string' || inputValue.value.length === 0)
      ) {
        stopAndPrevent(e)
        optionIndex.value = -1
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple)
      }
      if (
        (e.keyCode === 33 || e.keyCode === 34) &&
        virtualScrollSliceSizeComputed.value !== void 0
      ) {
        stopAndPrevent(e)
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value +
              (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view,
          ),
        )
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple)
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e)
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple)
      }
      const optionsLength = virtualScrollLength.value
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = ''
      }
      if (
        optionsLength > 0 &&
        props.useInput !== true &&
        e.key !== void 0 &&
        e.key.length === 1 &&
        e.altKey === false &&
        e.ctrlKey === false &&
        e.metaKey === false &&
        (e.keyCode !== 32 || searchBuffer.length !== 0)
      ) {
        menu.value !== true && showPopup(e)
        const char = e.key.toLocaleLowerCase(),
          keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char
        searchBufferExp = Date.now() + 1500
        if (keyRepeat === false) {
          stopAndPrevent(e)
          searchBuffer += char
        }
        const searchRe = new RegExp(
          '^' +
            searchBuffer
              .split('')
              .map((l) => (reEscapeList.indexOf(l) !== -1 ? '\\' + l : l))
              .join('.*'),
          'i',
        )
        let index = optionIndex.value
        if (
          keyRepeat === true ||
          index < 0 ||
          searchRe.test(getOptionLabel.value(props.options[index])) !== true
        ) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1)
          } while (
            index !== optionIndex.value &&
            (isOptionDisabled.value(props.options[index]) === true ||
              searchRe.test(getOptionLabel.value(props.options[index])) !== true)
          )
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index)
            scrollTo(index)
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]), true)
            }
          })
        }
        return
      }
      if (
        e.keyCode !== 13 &&
        (e.keyCode !== 32 || props.useInput === true || searchBuffer !== '') &&
        (e.keyCode !== 9 || tabShouldSelect === false)
      )
        return
      e.keyCode !== 9 && stopAndPrevent(e)
      if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value])
        return
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) return
          } else {
            mode = props.newValueMode
          }
          updateInputValue('', props.multiple !== true, true)
          if (val === void 0 || val === null) return
          const fn = mode === 'toggle' ? toggleOption : add
          fn(val, mode === 'add-unique')
          if (props.multiple !== true) {
            targetRef.value?.focus()
            hidePopup()
          }
        }
        if (props.onNewValue !== void 0) {
          emit('newValue', inputValue.value, done)
        } else {
          done(inputValue.value)
        }
        if (props.multiple !== true) return
      }
      if (menu.value === true) {
        closeMenu()
      } else if (state.innerLoading.value !== true) {
        showPopup()
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true
        ? menuContentRef.value
        : menuRef.value !== null && menuRef.value.contentEl !== null
          ? menuRef.value.contentEl
          : void 0
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl()
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return []
      }
      if (slots['selected-item'] !== void 0) {
        return selectedScope.value.map((scope) => slots['selected-item'](scope)).slice()
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected())
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) =>
          h(
            QChip,
            {
              key: 'option-' + i,
              removable:
                state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
              dense: true,
              textColor: props.color,
              tabindex: tabindex.value,
              onRemove() {
                scope.removeAtIndex(i)
              },
            },
            () =>
              h('span', {
                class: 'ellipsis',
                [scope.html === true ? 'innerHTML' : 'textContent']: getOptionLabel.value(
                  scope.opt,
                ),
              }),
          ),
        )
      }
      return [
        h('span', {
          class: 'ellipsis',
          [valueAsHtml.value === true ? 'innerHTML' : 'textContent']: ariaCurrentValue.value,
        }),
      ]
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots['no-option'] !== void 0
          ? slots['no-option']({ inputValue: inputValue.value })
          : void 0
      }
      const fn =
        slots.option !== void 0
          ? slots.option
          : (scope) => {
              return h(
                QItem,
                {
                  key: scope.index,
                  ...scope.itemProps,
                },
                () => {
                  return h(QItemSection, () =>
                    h(QItemLabel, () =>
                      h('span', {
                        [scope.html === true ? 'innerHTML' : 'textContent']: scope.label,
                      }),
                    ),
                  )
                },
              )
            }
      let options = padVirtualScroll('div', optionScope.value.map(fn))
      if (slots['before-options'] !== void 0) {
        options = slots['before-options']().concat(options)
      }
      return hMergeSlot(slots['after-options'], options)
    }
    function getInput(fromDialog, isTarget) {
      const attrs =
        isTarget === true
          ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value }
          : void 0
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: 'i_t',
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : '',
        // required for Android in order to show ENTER key when in form
        type: 'search',
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        'data-autofocus': fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value,
      }
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, 'no-pointer-events']
        } else {
          data.class += ' no-pointer-events'
        }
      }
      return h('input', data)
    }
    function onInput(e) {
      if (filterTimer !== null) {
        clearTimeout(filterTimer)
        filterTimer = null
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer)
        inputValueTimer = null
      }
      if (e && e.target && e.target.qComposing === true) return
      setInputValue(e.target.value || '')
      userInputValue = true
      defaultInputValue = inputValue.value
      if (
        state.focused.value !== true &&
        (hasDialog !== true || dialogFieldFocused.value === true)
      ) {
        state.focus()
      }
      if (props.onFilter !== void 0) {
        filterTimer = setTimeout(() => {
          filterTimer = null
          filter(inputValue.value)
        }, props.inputDebounce)
      }
    }
    function setInputValue(val, emitImmediately) {
      if (inputValue.value !== val) {
        inputValue.value = val
        if (emitImmediately === true || props.inputDebounce === 0 || props.inputDebounce === '0') {
          emit('inputValue', val)
        } else {
          inputValueTimer = setTimeout(() => {
            inputValueTimer = null
            emit('inputValue', val)
          }, props.inputDebounce)
        }
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true
      if (props.useInput === true) {
        setInputValue(val, true)
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val
        }
        noFiltering !== true && filter(val)
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || (keepClosed !== true && state.focused.value !== true)) return
      if (state.innerLoading.value === true) {
        emit('filterAbort')
      } else {
        state.innerLoading.value = true
        innerLoadingIndicator.value = true
      }
      if (
        val !== '' &&
        props.multiple !== true &&
        innerValue.value.length !== 0 &&
        userInputValue !== true &&
        val === getOptionLabel.value(innerValue.value[0])
      ) {
        val = ''
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false)
      }, 10)
      filterId !== null && clearTimeout(filterId)
      filterId = localFilterId
      emit(
        'filter',
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId)
            typeof fn === 'function' && fn()
            innerLoadingIndicator.value = false
            nextTick(() => {
              state.innerLoading.value = false
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup()
                } else if (menu.value === true) {
                  updateMenu(true)
                } else {
                  menu.value = true
                }
              }
              typeof afterFn === 'function' &&
                nextTick(() => {
                  afterFn(proxy)
                })
              typeof afterUpdateFn === 'function' &&
                nextTick(() => {
                  afterUpdateFn(proxy)
                })
            })
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId)
            state.innerLoading.value = false
            innerLoadingIndicator.value = false
          }
          menu.value === true && (menu.value = false)
        },
      )
    }
    function getMenu() {
      return h(
        QMenu,
        {
          ref: menuRef,
          class: menuContentClass.value,
          style: props.popupContentStyle,
          modelValue: menu.value,
          fit: props.menuShrink !== true,
          cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
          anchor: props.menuAnchor,
          self: props.menuSelf,
          offset: props.menuOffset,
          dark: isOptionsDark.value,
          noParentEvent: true,
          noRefocus: true,
          noFocus: true,
          noRouteDismiss: props.popupNoRouteDismiss,
          square: squaredMenu.value,
          transitionShow: props.transitionShow,
          transitionHide: props.transitionHide,
          transitionDuration: props.transitionDuration,
          separateClosePopup: true,
          ...listboxAttrs.value,
          onScrollPassive: onVirtualScrollEvt,
          onBeforeShow: onControlPopupShow,
          onBeforeHide: onMenuBeforeHide,
          onShow: onMenuShow,
        },
        getAllOptions,
      )
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e)
      closeMenu()
    }
    function onMenuShow() {
      setVirtualScrollSize()
    }
    function onDialogFieldFocus(e) {
      stop(e)
      targetRef.value?.focus()
      dialogFieldFocused.value = true
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0)
    }
    function onDialogFieldBlur(e) {
      stop(e)
      nextTick(() => {
        dialogFieldFocused.value = false
      })
    }
    function getDialog() {
      const content = [
        h(
          QField,
          {
            class: `col-auto ${state.fieldClass.value}`,
            ...innerFieldProps.value,
            for: state.targetUid.value,
            dark: isOptionsDark.value,
            square: true,
            loading: innerLoadingIndicator.value,
            itemAligned: false,
            filled: true,
            stackLabel: inputValue.value.length !== 0,
            ...state.splitAttrs.listeners.value,
            onFocus: onDialogFieldFocus,
            onBlur: onDialogFieldBlur,
          },
          {
            ...slots,
            rawControl: () => state.getControl(true),
            before: void 0,
            after: void 0,
          },
        ),
      ]
      menu.value === true &&
        content.push(
          h(
            'div',
            {
              ref: menuContentRef,
              class: menuContentClass.value + ' scroll',
              style: props.popupContentStyle,
              ...listboxAttrs.value,
              onClick: prevent,
              onScrollPassive: onVirtualScrollEvt,
            },
            getAllOptions(),
          ),
        )
      return h(
        QDialog,
        {
          ref: dialogRef,
          modelValue: dialog.value,
          position: props.useInput === true ? 'top' : void 0,
          transitionShow: transitionShowComputed,
          transitionHide: props.transitionHide,
          transitionDuration: props.transitionDuration,
          noRouteDismiss: props.popupNoRouteDismiss,
          onBeforeShow: onControlPopupShow,
          onBeforeHide: onDialogBeforeHide,
          onHide: onDialogHide,
          onShow: onDialogShow,
        },
        () =>
          h(
            'div',
            {
              class:
                'q-select__dialog' +
                (isOptionsDark.value === true ? ' q-select__dialog--dark q-dark' : '') +
                (dialogFieldFocused.value === true ? ' q-select__dialog--focused' : ''),
            },
            content,
          ),
      )
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e)
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector('.q-field__native > [tabindex]:last-child'),
        )
      }
      state.focused.value = false
    }
    function onDialogHide(e) {
      hidePopup()
      state.focused.value === false && emit('blur', e)
      resetInputValue()
    }
    function onDialogShow() {
      const el = document.activeElement
      if (
        (el === null || el.id !== state.targetUid.value) &&
        targetRef.value !== null &&
        targetRef.value !== el
      ) {
        targetRef.value.focus()
      }
      setVirtualScrollSize()
    }
    function closeMenu() {
      if (dialog.value === true) return
      optionIndex.value = -1
      if (menu.value === true) {
        menu.value = false
      }
      if (state.focused.value === false) {
        if (filterId !== null) {
          clearTimeout(filterId)
          filterId = null
        }
        if (state.innerLoading.value === true) {
          emit('filterAbort')
          state.innerLoading.value = false
          innerLoadingIndicator.value = false
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) return
      if (hasDialog === true) {
        state.onControlFocusin(e)
        dialog.value = true
        nextTick(() => {
          state.focus()
        })
      } else {
        state.focus()
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value)
      } else if (noOptions.value !== true || slots['no-option'] !== void 0) {
        menu.value = true
      }
    }
    function hidePopup() {
      dialog.value = false
      closeMenu()
    }
    function resetInputValue() {
      props.useInput === true &&
        updateInputValue(
          props.multiple !== true && props.fillInput === true && innerValue.value.length !== 0
            ? getOptionLabel.value(innerValue.value[0]) || ''
            : '',
          true,
          true,
        )
    }
    function updateMenu(show) {
      let optionIndex2 = -1
      if (show === true) {
        if (innerValue.value.length !== 0) {
          const val = getOptionValue.value(innerValue.value[0])
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val))
        }
        localResetVirtualScroll(optionIndex2)
      }
      setOptionIndex(optionIndex2)
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true)
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll()
            } else {
              updateMenu(true)
            }
          }
        })
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition()
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e)
      emit('popupShow', e)
      state.hasPopupOpen = true
      state.onControlFocusin(e)
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e)
      emit('popupHide', e)
      state.hasPopupOpen = false
      state.onControlFocusout(e)
    }
    function updatePreState() {
      hasDialog =
        $q.platform.is.mobile !== true && props.behavior !== 'dialog'
          ? false
          : props.behavior !== 'menu' &&
            (props.useInput === true
              ? slots['no-option'] !== void 0 ||
                props.onFilter !== void 0 ||
                noOptions.value === false
              : true)
      transitionShowComputed =
        $q.platform.is.ios === true && hasDialog === true && props.useInput === true
          ? 'fade'
          : props.transitionShow
    }
    onBeforeUpdate(updatePreState)
    onUpdated(updateMenuPosition)
    updatePreState()
    onBeforeUnmount(() => {
      filterTimer !== null && clearTimeout(filterTimer)
      inputValueTimer !== null && clearTimeout(inputValueTimer)
    })
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args),
    })
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () =>
          `q-select q-field--auto-height q-select--with${props.useInput !== true ? 'out' : ''}-input q-select--with${props.useChips !== true ? 'out' : ''}-chips q-select--${props.multiple === true ? 'multiple' : 'single'}`,
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () =>
          (props.hideSelected !== true && hasValue.value === true) ||
          typeof inputValue.value === 'number' ||
          inputValue.value.length !== 0 ||
          fieldValueIsFilled(props.displayValue),
      ),
      getControlChild: () => {
        if (
          state.editable.value !== false &&
          (dialog.value === true || noOptions.value !== true || slots['no-option'] !== void 0)
        ) {
          return hasDialog === true ? getDialog() : getMenu()
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e)
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue()
            closeMenu()
          })
        },
        onClick(e) {
          prevent(e)
          if (hasDialog !== true && menu.value === true) {
            closeMenu()
            targetRef.value?.focus()
            return
          }
          showPopup(e)
        },
      },
      getControl: (fromDialog) => {
        const child = getSelection()
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget))
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0
          child.push(
            h('input', {
              ref: isTarget === true ? targetRef : void 0,
              key: 'd_t',
              class: 'q-select__focus-target',
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              'data-autofocus': fromDialog === true || props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress,
            }),
          )
          if (
            isTarget === true &&
            typeof props.autocomplete === 'string' &&
            props.autocomplete.length !== 0
          ) {
            child.push(
              h('input', {
                class: 'q-select__autocomplete-input',
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete,
              }),
            )
          }
        }
        if (
          nameProp.value !== void 0 &&
          props.disable !== true &&
          innerOptionsValue.value.length !== 0
        ) {
          const opts = innerOptionsValue.value.map((value) =>
            h('option', { value, selected: true }),
          )
          child.push(
            h(
              'select',
              {
                class: 'hidden',
                name: nameProp.value,
                multiple: props.multiple,
              },
              opts,
            ),
          )
        }
        const attrs =
          props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value
        return h(
          'div',
          {
            class: 'q-field__native row items-center',
            ...attrs,
            ...state.splitAttrs.listeners.value,
          },
          child,
        )
      },
      getInnerAppend: () =>
        props.loading !== true &&
        innerLoadingIndicator.value !== true &&
        props.hideDropdownIcon !== true
          ? [
              h(QIcon, {
                class: 'q-select__dropdown-icon' + (menu.value === true ? ' rotate-180' : ''),
                name: dropdownArrowIcon.value,
              }),
            ]
          : null,
    })
    return useField(state)
  },
})
const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14,
}
function width(val, reverse, $q) {
  return {
    transform:
      reverse === true
        ? `translateX(${$q.lang.rtl === true ? '-' : ''}100%) scale3d(${-val},1,1)`
        : `scale3d(${val},1,1)`,
  }
}
const QLinearProgress = createComponent({
  name: 'QLinearProgress',
  props: {
    ...useDarkProps,
    ...useSizeProps,
    value: {
      type: Number,
      default: 0,
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100,
    },
    instantFeedback: Boolean,
  },
  setup(props, { slots }) {
    const { proxy } = getCurrentInstance()
    const isDark = useDark(props, proxy.$q)
    const sizeStyle = useSize(props, defaultSizes)
    const motion = computed(() => props.indeterminate === true || props.query === true)
    const widthReverse = computed(() => props.reverse !== props.query)
    const style = computed(() => ({
      ...(sizeStyle.value !== null ? sizeStyle.value : {}),
      '--q-linear-progress-speed': `${props.animationSpeed}ms`,
    }))
    const classes = computed(
      () =>
        'q-linear-progress' +
        (props.color !== void 0 ? ` text-${props.color}` : '') +
        (props.reverse === true || props.query === true ? ' q-linear-progress--reverse' : '') +
        (props.rounded === true ? ' rounded-borders' : ''),
    )
    const trackStyle = computed(() =>
      width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q),
    )
    const transitionSuffix = computed(
      () => `with${props.instantFeedback === true ? 'out' : ''}-transition`,
    )
    const trackClass = computed(
      () =>
        `q-linear-progress__track absolute-full q-linear-progress__track--${transitionSuffix.value} q-linear-progress__track--${isDark.value === true ? 'dark' : 'light'}` +
        (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : ''),
    )
    const modelStyle = computed(() =>
      width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q),
    )
    const modelClass = computed(
      () =>
        `q-linear-progress__model absolute-full q-linear-progress__model--${transitionSuffix.value} q-linear-progress__model--${motion.value === true ? 'in' : ''}determinate`,
    )
    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }))
    const stripeClass = computed(
      () =>
        `q-linear-progress__stripe absolute-${props.reverse === true ? 'right' : 'left'} q-linear-progress__stripe--${transitionSuffix.value}`,
    )
    return () => {
      const child = [
        h('div', {
          class: trackClass.value,
          style: trackStyle.value,
        }),
        h('div', {
          class: modelClass.value,
          style: modelStyle.value,
        }),
      ]
      props.stripe === true &&
        motion.value === false &&
        child.push(
          h('div', {
            class: stripeClass.value,
            style: stripeStyle.value,
          }),
        )
      return h(
        'div',
        {
          class: classes.value,
          style: style.value,
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': 1,
          'aria-valuenow': props.indeterminate === true ? void 0 : props.value,
        },
        hMergeSlot(slots.default, child),
      )
    }
  },
})
let counter = 0
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean,
}
const useFullscreenEmits = ['update:fullscreen', 'fullscreen']
function useFullscreen() {
  const vm = getCurrentInstance()
  const { props, emit, proxy } = vm
  let historyEntry, fullscreenFillerNode, container
  const inFullscreen = ref(false)
  vmHasRouter(vm) === true &&
    watch(
      () => proxy.$route.fullPath,
      () => {
        props.noRouteFullscreenExit !== true && exitFullscreen()
      },
    )
  watch(
    () => props.fullscreen,
    (v) => {
      if (inFullscreen.value !== v) {
        toggleFullscreen()
      }
    },
  )
  watch(inFullscreen, (v) => {
    emit('update:fullscreen', v)
    emit('fullscreen', v)
  })
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen()
    } else {
      setFullscreen()
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) return
    inFullscreen.value = true
    container = proxy.$el.parentNode
    container.replaceChild(fullscreenFillerNode, proxy.$el)
    document.body.appendChild(proxy.$el)
    counter++
    if (counter === 1) {
      document.body.classList.add('q-body--fullscreen-mixin')
    }
    historyEntry = {
      handler: exitFullscreen,
    }
    History.add(historyEntry)
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) return
    if (historyEntry !== void 0) {
      History.remove(historyEntry)
      historyEntry = void 0
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode)
    inFullscreen.value = false
    counter = Math.max(0, counter - 1)
    if (counter === 0) {
      document.body.classList.remove('q-body--fullscreen-mixin')
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView()
        })
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement('span')
  })
  onMounted(() => {
    props.fullscreen === true && setFullscreen()
  })
  onBeforeUnmount(exitFullscreen)
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen,
  })
  return {
    inFullscreen,
    toggleFullscreen,
  }
}
function sortDate(a, b) {
  return new Date(a) - new Date(b)
}
const useTableSortProps = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (v) => v === 'ad' || v === 'da',
    default: 'ad',
  },
}
function useTableSort(props, computedPagination, colList, setPagination) {
  const columnToSort = computed(() => {
    const { sortBy } = computedPagination.value
    return sortBy ? colList.value.find((def) => def.name === sortBy) || null : null
  })
  const computedSortMethod = computed(() =>
    props.sortMethod !== void 0
      ? props.sortMethod
      : (data, sortBy, descending) => {
          const col = colList.value.find((def) => def.name === sortBy)
          if (col === void 0 || col.field === void 0) {
            return data
          }
          const dir = descending === true ? -1 : 1,
            val = typeof col.field === 'function' ? (v) => col.field(v) : (v) => v[col.field]
          return data.sort((a, b) => {
            let A = val(a),
              B = val(b)
            if (col.rawSort !== void 0) {
              return col.rawSort(A, B, a, b) * dir
            }
            if (A === null || A === void 0) {
              return -1 * dir
            }
            if (B === null || B === void 0) {
              return 1 * dir
            }
            if (col.sort !== void 0) {
              return col.sort(A, B, a, b) * dir
            }
            if (isNumber(A) === true && isNumber(B) === true) {
              return (A - B) * dir
            }
            if (isDate(A) === true && isDate(B) === true) {
              return sortDate(A, B) * dir
            }
            if (typeof A === 'boolean' && typeof B === 'boolean') {
              return (A - B) * dir
            }
            ;[A, B] = [A, B].map((s) => (s + '').toLocaleString().toLowerCase())
            return A < B ? -1 * dir : A === B ? 0 : dir
          })
        },
  )
  function sort(col) {
    let sortOrder = props.columnSortOrder
    if (isObject(col) === true) {
      if (col.sortOrder) {
        sortOrder = col.sortOrder
      }
      col = col.name
    } else {
      const def = colList.value.find((def2) => def2.name === col)
      if (def?.sortOrder) {
        sortOrder = def.sortOrder
      }
    }
    let { sortBy, descending } = computedPagination.value
    if (sortBy !== col) {
      sortBy = col
      descending = sortOrder === 'da'
    } else if (props.binaryStateSort === true) {
      descending = !descending
    } else if (descending === true) {
      if (sortOrder === 'ad') {
        sortBy = null
      } else {
        descending = false
      }
    } else {
      if (sortOrder === 'ad') {
        descending = true
      } else {
        sortBy = null
      }
    }
    setPagination({ sortBy, descending, page: 1 })
  }
  return {
    columnToSort,
    computedSortMethod,
    sort,
  }
}
const useTableFilterProps = {
  filter: [String, Object],
  filterMethod: Function,
}
function useTableFilter(props, setPagination) {
  const computedFilterMethod = computed(() =>
    props.filterMethod !== void 0
      ? props.filterMethod
      : (rows, terms, cols, cellValue) => {
          const lowerTerms = terms ? terms.toLowerCase() : ''
          return rows.filter((row) =>
            cols.some((col) => {
              const val = cellValue(col, row) + ''
              const haystack = val === 'undefined' || val === 'null' ? '' : val.toLowerCase()
              return haystack.indexOf(lowerTerms) !== -1
            }),
          )
        },
  )
  watch(
    () => props.filter,
    () => {
      nextTick(() => {
        setPagination({ page: 1 }, true)
      })
    },
    { deep: true },
  )
  return { computedFilterMethod }
}
function samePagination(oldPag, newPag) {
  for (const prop in newPag) {
    if (newPag[prop] !== oldPag[prop]) {
      return false
    }
  }
  return true
}
function fixPagination(p) {
  if (p.page < 1) {
    p.page = 1
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0
  }
  return p
}
const useTablePaginationProps = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [5, 7, 10, 15, 20, 25, 50, 0],
  },
  'onUpdate:pagination': [Function, Array],
}
function useTablePaginationState(vm, getCellValue) {
  const { props, emit } = vm
  const innerPagination = ref(
    Object.assign(
      {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: props.rowsPerPageOptions.length !== 0 ? props.rowsPerPageOptions[0] : 5,
      },
      props.pagination,
    ),
  )
  const computedPagination = computed(() => {
    const pag =
      props['onUpdate:pagination'] !== void 0
        ? { ...innerPagination.value, ...props.pagination }
        : innerPagination.value
    return fixPagination(pag)
  })
  const isServerSide = computed(() => computedPagination.value.rowsNumber !== void 0)
  function sendServerRequest(pagination) {
    requestServerInteraction({
      pagination,
      filter: props.filter,
    })
  }
  function requestServerInteraction(prop = {}) {
    nextTick(() => {
      emit('request', {
        pagination: prop.pagination || computedPagination.value,
        filter: prop.filter || props.filter,
        getCellValue,
      })
    })
  }
  function setPagination(val, forceServerRequest) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val,
    })
    if (samePagination(computedPagination.value, newPagination) === true) {
      if (isServerSide.value === true && forceServerRequest === true) {
        sendServerRequest(newPagination)
      }
      return
    }
    if (isServerSide.value === true) {
      sendServerRequest(newPagination)
      return
    }
    if (props.pagination !== void 0 && props['onUpdate:pagination'] !== void 0) {
      emit('update:pagination', newPagination)
    } else {
      innerPagination.value = newPagination
    }
  }
  return {
    innerPagination,
    computedPagination,
    isServerSide,
    requestServerInteraction,
    setPagination,
  }
}
function useTablePagination(
  vm,
  innerPagination,
  computedPagination,
  isServerSide,
  setPagination,
  filteredSortedRowsNumber,
) {
  const {
    props,
    emit,
    proxy: { $q },
  } = vm
  const computedRowsNumber = computed(() =>
    isServerSide.value === true
      ? computedPagination.value.rowsNumber || 0
      : filteredSortedRowsNumber.value,
  )
  const firstRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value
    return (page - 1) * rowsPerPage
  })
  const lastRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value
    return page * rowsPerPage
  })
  const isFirstPage = computed(() => computedPagination.value.page === 1)
  const pagesNumber = computed(() =>
    computedPagination.value.rowsPerPage === 0
      ? 1
      : Math.max(1, Math.ceil(computedRowsNumber.value / computedPagination.value.rowsPerPage)),
  )
  const isLastPage = computed(() =>
    lastRowIndex.value === 0 ? true : computedPagination.value.page >= pagesNumber.value,
  )
  const computedRowsPerPageOptions = computed(() => {
    const opts = props.rowsPerPageOptions.includes(innerPagination.value.rowsPerPage)
      ? props.rowsPerPageOptions
      : [innerPagination.value.rowsPerPage].concat(props.rowsPerPageOptions)
    return opts.map((count) => ({
      label: count === 0 ? $q.lang.table.allRows : '' + count,
      value: count,
    }))
  })
  watch(pagesNumber, (lastPage2, oldLastPage) => {
    if (lastPage2 === oldLastPage) return
    const currentPage = computedPagination.value.page
    if (lastPage2 && !currentPage) {
      setPagination({ page: 1 })
    } else if (lastPage2 < currentPage) {
      setPagination({ page: lastPage2 })
    }
  })
  function firstPage() {
    setPagination({ page: 1 })
  }
  function prevPage() {
    const { page } = computedPagination.value
    if (page > 1) {
      setPagination({ page: page - 1 })
    }
  }
  function nextPage() {
    const { page, rowsPerPage } = computedPagination.value
    if (lastRowIndex.value > 0 && page * rowsPerPage < computedRowsNumber.value) {
      setPagination({ page: page + 1 })
    }
  }
  function lastPage() {
    setPagination({ page: pagesNumber.value })
  }
  if (props['onUpdate:pagination'] !== void 0) {
    emit('update:pagination', { ...computedPagination.value })
  }
  return {
    firstRowIndex,
    lastRowIndex,
    isFirstPage,
    isLastPage,
    pagesNumber,
    computedRowsPerPageOptions,
    computedRowsNumber,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
  }
}
const useTableRowSelectionProps = {
  selection: {
    type: String,
    default: 'none',
    validator: (v) => ['single', 'multiple', 'none'].includes(v),
  },
  selected: {
    type: Array,
    default: () => [],
  },
}
const useTableRowSelectionEmits = ['update:selected', 'selection']
function useTableRowSelection(props, emit, computedRows, getRowKey) {
  const selectedKeys = computed(() => {
    const keys = {}
    props.selected.map(getRowKey.value).forEach((key) => {
      keys[key] = true
    })
    return keys
  })
  const hasSelectionMode = computed(() => {
    return props.selection !== 'none'
  })
  const singleSelection = computed(() => {
    return props.selection === 'single'
  })
  const multipleSelection = computed(() => {
    return props.selection === 'multiple'
  })
  const allRowsSelected = computed(
    () =>
      computedRows.value.length !== 0 &&
      computedRows.value.every((row) => selectedKeys.value[getRowKey.value(row)] === true),
  )
  const someRowsSelected = computed(
    () =>
      allRowsSelected.value !== true &&
      computedRows.value.some((row) => selectedKeys.value[getRowKey.value(row)] === true),
  )
  const rowsSelectedNumber = computed(() => props.selected.length)
  function isRowSelected(key) {
    return selectedKeys.value[key] === true
  }
  function clearSelection2() {
    emit('update:selected', [])
  }
  function updateSelection(keys, rows, added, evt) {
    emit('selection', { rows, added, keys, evt })
    const payload =
      singleSelection.value === true
        ? added === true
          ? rows
          : []
        : added === true
          ? props.selected.concat(rows)
          : props.selected.filter((row) => keys.includes(getRowKey.value(row)) === false)
    emit('update:selected', payload)
  }
  return {
    hasSelectionMode,
    singleSelection,
    multipleSelection,
    allRowsSelected,
    someRowsSelected,
    rowsSelectedNumber,
    isRowSelected,
    clearSelection: clearSelection2,
    updateSelection,
  }
}
function getVal(val) {
  return Array.isArray(val) ? val.slice() : []
}
const useTableRowExpandProps = {
  expanded: Array,
  // v-model:expanded
}
const useTableRowExpandEmits = ['update:expanded']
function useTableRowExpand(props, emit) {
  const innerExpanded = ref(getVal(props.expanded))
  watch(
    () => props.expanded,
    (val) => {
      innerExpanded.value = getVal(val)
    },
  )
  function isRowExpanded(key) {
    return innerExpanded.value.includes(key)
  }
  function setExpanded(val) {
    if (props.expanded !== void 0) {
      emit('update:expanded', val)
    } else {
      innerExpanded.value = val
    }
  }
  function updateExpanded(key, add) {
    const target = innerExpanded.value.slice()
    const index = target.indexOf(key)
    if (add === true) {
      if (index === -1) {
        target.push(key)
        setExpanded(target)
      }
    } else if (index !== -1) {
      target.splice(index, 1)
      setExpanded(target)
    }
  }
  return {
    isRowExpanded,
    setExpanded,
    updateExpanded,
  }
}
const useTableColumnSelectionProps = {
  visibleColumns: Array,
}
function useTableColumnSelection(props, computedPagination, hasSelectionMode) {
  const colList = computed(() => {
    if (props.columns !== void 0) {
      return props.columns
    }
    const row = props.rows[0]
    return row !== void 0
      ? Object.keys(row).map((name) => ({
          name,
          label: name.toUpperCase(),
          field: name,
          align: isNumber(row[name]) ? 'right' : 'left',
          sortable: true,
        }))
      : []
  })
  const computedCols = computed(() => {
    const { sortBy, descending } = computedPagination.value
    const cols =
      props.visibleColumns !== void 0
        ? colList.value.filter(
            (col) => col.required === true || props.visibleColumns.includes(col.name) === true,
          )
        : colList.value
    return cols.map((col) => {
      const align = col.align || 'right'
      const alignClass = `text-${align}`
      return {
        ...col,
        align,
        __iconClass: `q-table__sort-icon q-table__sort-icon--${align}`,
        __thClass:
          alignClass +
          (col.headerClasses !== void 0 ? ' ' + col.headerClasses : '') +
          (col.sortable === true ? ' sortable' : '') +
          (col.name === sortBy ? ` sorted ${descending === true ? 'sort-desc' : ''}` : ''),
        __tdStyle:
          col.style !== void 0
            ? typeof col.style !== 'function'
              ? () => col.style
              : col.style
            : () => null,
        __tdClass:
          col.classes !== void 0
            ? typeof col.classes !== 'function'
              ? () => alignClass + ' ' + col.classes
              : (row) => alignClass + ' ' + col.classes(row)
            : () => alignClass,
      }
    })
  })
  const computedColsMap = computed(() => {
    const names = {}
    computedCols.value.forEach((col) => {
      names[col.name] = col
    })
    return names
  })
  const computedColspan = computed(() => {
    return props.tableColspan !== void 0
      ? props.tableColspan
      : computedCols.value.length + (hasSelectionMode.value === true ? 1 : 0)
  })
  return {
    colList,
    computedCols,
    computedColsMap,
    computedColspan,
  }
}
const bottomClass = 'q-table__bottom row items-center'
const virtScrollPassthroughProps = {}
commonVirtScrollPropsList.forEach((p) => {
  virtScrollPassthroughProps[p] = {}
})
const QTable = createComponent({
  name: 'QTable',
  props: {
    rows: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    columns: Array,
    loading: Boolean,
    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,
    title: String,
    hideHeader: Boolean,
    grid: Boolean,
    gridHeader: Boolean,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical', 'cell', 'none'].includes(v),
    },
    wrapCells: Boolean,
    virtualScroll: Boolean,
    virtualScrollTarget: {},
    ...virtScrollPassthroughProps,
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    color: {
      type: String,
      default: 'grey-8',
    },
    titleClass: [String, Array, Object],
    tableStyle: [String, Array, Object],
    tableClass: [String, Array, Object],
    tableHeaderStyle: [String, Array, Object],
    tableHeaderClass: [String, Array, Object],
    tableRowStyleFn: Function,
    tableRowClassFn: Function,
    cardContainerClass: [String, Array, Object],
    cardContainerStyle: [String, Array, Object],
    cardStyle: [String, Array, Object],
    cardClass: [String, Array, Object],
    cardStyleFn: Function,
    cardClassFn: Function,
    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,
    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,
    ...useDarkProps,
    ...useFullscreenProps,
    ...useTableColumnSelectionProps,
    ...useTableFilterProps,
    ...useTablePaginationProps,
    ...useTableRowExpandProps,
    ...useTableRowSelectionProps,
    ...useTableSortProps,
  },
  emits: [
    'request',
    'virtualScroll',
    ...useFullscreenEmits,
    ...useTableRowExpandEmits,
    ...useTableRowSelectionEmits,
  ],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance()
    const {
      proxy: { $q },
    } = vm
    const isDark = useDark(props, $q)
    const { inFullscreen, toggleFullscreen } = useFullscreen()
    const getRowKey = computed(() =>
      typeof props.rowKey === 'function' ? props.rowKey : (row) => row[props.rowKey],
    )
    const rootRef = ref(null)
    const virtScrollRef = ref(null)
    const hasVirtScroll = computed(() => props.grid !== true && props.virtualScroll === true)
    const cardDefaultClass = computed(
      () =>
        ' q-table__card' +
        (isDark.value === true ? ' q-table__card--dark q-dark' : '') +
        (props.square === true ? ' q-table--square' : '') +
        (props.flat === true ? ' q-table--flat' : '') +
        (props.bordered === true ? ' q-table--bordered' : ''),
    )
    const containerClass = computed(
      () =>
        `q-table__container q-table--${props.separator}-separator column no-wrap` +
        (props.grid === true ? ' q-table--grid' : cardDefaultClass.value) +
        (isDark.value === true ? ' q-table--dark' : '') +
        (props.dense === true ? ' q-table--dense' : '') +
        (props.wrapCells === false ? ' q-table--no-wrap' : '') +
        (inFullscreen.value === true ? ' fullscreen scroll' : ''),
    )
    const rootContainerClass = computed(
      () => containerClass.value + (props.loading === true ? ' q-table--loading' : ''),
    )
    watch(
      () =>
        props.tableStyle +
        props.tableClass +
        props.tableHeaderStyle +
        props.tableHeaderClass +
        containerClass.value,
      () => {
        hasVirtScroll.value === true && virtScrollRef.value?.reset()
      },
    )
    const {
      innerPagination,
      computedPagination,
      isServerSide,
      requestServerInteraction,
      setPagination,
    } = useTablePaginationState(vm, getCellValue)
    const { computedFilterMethod } = useTableFilter(props, setPagination)
    const { isRowExpanded, setExpanded, updateExpanded } = useTableRowExpand(props, emit)
    const filteredSortedRows = computed(() => {
      let rows = props.rows
      if (isServerSide.value === true || rows.length === 0) {
        return rows
      }
      const { sortBy, descending } = computedPagination.value
      if (props.filter) {
        rows = computedFilterMethod.value(rows, props.filter, computedCols.value, getCellValue)
      }
      if (columnToSort.value !== null) {
        rows = computedSortMethod.value(
          props.rows === rows ? rows.slice() : rows,
          sortBy,
          descending,
        )
      }
      return rows
    })
    const filteredSortedRowsNumber = computed(() => filteredSortedRows.value.length)
    const computedRows = computed(() => {
      let rows = filteredSortedRows.value
      if (isServerSide.value === true) {
        return rows
      }
      const { rowsPerPage } = computedPagination.value
      if (rowsPerPage !== 0) {
        if (firstRowIndex.value === 0 && props.rows !== rows) {
          if (rows.length > lastRowIndex.value) {
            rows = rows.slice(0, lastRowIndex.value)
          }
        } else {
          rows = rows.slice(firstRowIndex.value, lastRowIndex.value)
        }
      }
      return rows
    })
    const {
      hasSelectionMode,
      singleSelection,
      multipleSelection,
      allRowsSelected,
      someRowsSelected,
      rowsSelectedNumber,
      isRowSelected,
      clearSelection: clearSelection2,
      updateSelection,
    } = useTableRowSelection(props, emit, computedRows, getRowKey)
    const { colList, computedCols, computedColsMap, computedColspan } = useTableColumnSelection(
      props,
      computedPagination,
      hasSelectionMode,
    )
    const { columnToSort, computedSortMethod, sort } = useTableSort(
      props,
      computedPagination,
      colList,
      setPagination,
    )
    const {
      firstRowIndex,
      lastRowIndex,
      isFirstPage,
      isLastPage,
      pagesNumber,
      computedRowsPerPageOptions,
      computedRowsNumber,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
    } = useTablePagination(
      vm,
      innerPagination,
      computedPagination,
      isServerSide,
      setPagination,
      filteredSortedRowsNumber,
    )
    const nothingToDisplay = computed(() => computedRows.value.length === 0)
    const virtProps = computed(() => {
      const acc = {}
      commonVirtScrollPropsList.forEach((p) => {
        acc[p] = props[p]
      })
      if (acc.virtualScrollItemSize === void 0) {
        acc.virtualScrollItemSize = props.dense === true ? 28 : 48
      }
      return acc
    })
    function resetVirtualScroll() {
      hasVirtScroll.value === true && virtScrollRef.value.reset()
    }
    function getBody() {
      if (props.grid === true) {
        return getGridBody()
      }
      const header = props.hideHeader !== true ? getTHead : null
      if (hasVirtScroll.value === true) {
        const topRow = slots['top-row']
        const bottomRow = slots['bottom-row']
        const virtSlots = {
          default: (props2) => getTBodyTR(props2.item, slots.body, props2.index),
        }
        if (topRow !== void 0) {
          const topContent = h('tbody', topRow({ cols: computedCols.value }))
          virtSlots.before =
            header === null ? () => topContent : () => [header()].concat(topContent)
        } else if (header !== null) {
          virtSlots.before = header
        }
        if (bottomRow !== void 0) {
          virtSlots.after = () => h('tbody', bottomRow({ cols: computedCols.value }))
        }
        return h(
          QVirtualScroll,
          {
            ref: virtScrollRef,
            class: props.tableClass,
            style: props.tableStyle,
            ...virtProps.value,
            scrollTarget: props.virtualScrollTarget,
            items: computedRows.value,
            type: '__qtable',
            tableColspan: computedColspan.value,
            onVirtualScroll: onVScroll,
          },
          virtSlots,
        )
      }
      const child = [getTBody()]
      if (header !== null) {
        child.unshift(header())
      }
      return getTableMiddle(
        {
          class: ['q-table__middle scroll', props.tableClass],
          style: props.tableStyle,
        },
        child,
      )
    }
    function scrollTo(toIndex, edge) {
      if (virtScrollRef.value !== null) {
        virtScrollRef.value.scrollTo(toIndex, edge)
        return
      }
      toIndex = parseInt(toIndex, 10)
      const rowEl = rootRef.value.querySelector(`tbody tr:nth-of-type(${toIndex + 1})`)
      if (rowEl !== null) {
        const scrollTarget = rootRef.value.querySelector('.q-table__middle.scroll')
        const offsetTop = rowEl.offsetTop - props.virtualScrollStickySizeStart
        const direction = offsetTop < scrollTarget.scrollTop ? 'decrease' : 'increase'
        scrollTarget.scrollTop = offsetTop
        emit('virtualScroll', {
          index: toIndex,
          from: 0,
          to: innerPagination.value.rowsPerPage - 1,
          direction,
        })
      }
    }
    function onVScroll(info) {
      emit('virtualScroll', info)
    }
    function getProgress() {
      return [
        h(QLinearProgress, {
          class: 'q-table__linear-progress',
          color: props.color,
          dark: isDark.value,
          indeterminate: true,
          trackColor: 'transparent',
        }),
      ]
    }
    function getTBodyTR(row, bodySlot, pageIndex) {
      const key = getRowKey.value(row),
        selected = isRowSelected(key)
      if (bodySlot !== void 0) {
        const cfg = {
          key,
          row,
          pageIndex,
          __trClass: selected ? 'selected' : '',
        }
        if (props.tableRowStyleFn !== void 0) {
          cfg.__trStyle = props.tableRowStyleFn(row)
        }
        if (props.tableRowClassFn !== void 0) {
          const cls = props.tableRowClassFn(row)
          if (cls) {
            cfg.__trClass = `${cls} ${cfg.__trClass}`
          }
        }
        return bodySlot(getBodyScope(cfg))
      }
      const bodyCell = slots['body-cell'],
        child = computedCols.value.map((col) => {
          const bodyCellCol = slots[`body-cell-${col.name}`],
            slot = bodyCellCol !== void 0 ? bodyCellCol : bodyCell
          return slot !== void 0
            ? slot(getBodyCellScope({ key, row, pageIndex, col }))
            : h(
                'td',
                {
                  class: col.__tdClass(row),
                  style: col.__tdStyle(row),
                },
                getCellValue(col, row),
              )
        })
      if (hasSelectionMode.value === true) {
        const slot = slots['body-selection']
        const content =
          slot !== void 0
            ? slot(getBodySelectionScope({ key, row, pageIndex }))
            : [
                h(QCheckbox, {
                  modelValue: selected,
                  color: props.color,
                  dark: isDark.value,
                  dense: props.dense,
                  'onUpdate:modelValue': (adding, evt) => {
                    updateSelection([key], [row], adding, evt)
                  },
                }),
              ]
        child.unshift(h('td', { class: 'q-table--col-auto-width' }, content))
      }
      const data = { key, class: { selected } }
      if (props.onRowClick !== void 0) {
        data.class['cursor-pointer'] = true
        data.onClick = (evt) => {
          emit('rowClick', evt, row, pageIndex)
        }
      }
      if (props.onRowDblclick !== void 0) {
        data.class['cursor-pointer'] = true
        data.onDblclick = (evt) => {
          emit('rowDblclick', evt, row, pageIndex)
        }
      }
      if (props.onRowContextmenu !== void 0) {
        data.class['cursor-pointer'] = true
        data.onContextmenu = (evt) => {
          emit('rowContextmenu', evt, row, pageIndex)
        }
      }
      if (props.tableRowStyleFn !== void 0) {
        data.style = props.tableRowStyleFn(row)
      }
      if (props.tableRowClassFn !== void 0) {
        const cls = props.tableRowClassFn(row)
        if (cls) {
          data.class[cls] = true
        }
      }
      return h('tr', data, child)
    }
    function getTBody() {
      const body = slots.body,
        topRow = slots['top-row'],
        bottomRow = slots['bottom-row']
      let child = computedRows.value.map((row, pageIndex) => getTBodyTR(row, body, pageIndex))
      if (topRow !== void 0) {
        child = topRow({ cols: computedCols.value }).concat(child)
      }
      if (bottomRow !== void 0) {
        child = child.concat(bottomRow({ cols: computedCols.value }))
      }
      return h('tbody', child)
    }
    function getBodyScope(data) {
      injectBodyCommonScope(data)
      data.cols = data.cols.map((col) =>
        injectProp({ ...col }, 'value', () => getCellValue(col, data.row)),
      )
      return data
    }
    function getBodyCellScope(data) {
      injectBodyCommonScope(data)
      injectProp(data, 'value', () => getCellValue(data.col, data.row))
      return data
    }
    function getBodySelectionScope(data) {
      injectBodyCommonScope(data)
      return data
    }
    function injectBodyCommonScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        colsMap: computedColsMap.value,
        sort,
        rowIndex: firstRowIndex.value + data.pageIndex,
        color: props.color,
        dark: isDark.value,
        dense: props.dense,
      })
      hasSelectionMode.value === true &&
        injectProp(
          data,
          'selected',
          () => isRowSelected(data.key),
          (adding, evt) => {
            updateSelection([data.key], [data.row], adding, evt)
          },
        )
      injectProp(
        data,
        'expand',
        () => isRowExpanded(data.key),
        (adding) => {
          updateExpanded(data.key, adding)
        },
      )
    }
    function getCellValue(col, row) {
      const val = typeof col.field === 'function' ? col.field(row) : row[col.field]
      return col.format !== void 0 ? col.format(val, row) : val
    }
    const marginalsScope = computed(() => ({
      pagination: computedPagination.value,
      pagesNumber: pagesNumber.value,
      isFirstPage: isFirstPage.value,
      isLastPage: isLastPage.value,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      inFullscreen: inFullscreen.value,
      toggleFullscreen,
    }))
    function getTopDiv() {
      const top = slots.top,
        topLeft = slots['top-left'],
        topRight = slots['top-right'],
        topSelection = slots['top-selection'],
        hasSelection =
          hasSelectionMode.value === true &&
          topSelection !== void 0 &&
          rowsSelectedNumber.value > 0,
        topClass = 'q-table__top relative-position row items-center'
      if (top !== void 0) {
        return h('div', { class: topClass }, [top(marginalsScope.value)])
      }
      let child
      if (hasSelection === true) {
        child = topSelection(marginalsScope.value).slice()
      } else {
        child = []
        if (topLeft !== void 0) {
          child.push(h('div', { class: 'q-table__control' }, [topLeft(marginalsScope.value)]))
        } else if (props.title) {
          child.push(
            h('div', { class: 'q-table__control' }, [
              h(
                'div',
                {
                  class: ['q-table__title', props.titleClass],
                },
                props.title,
              ),
            ]),
          )
        }
      }
      if (topRight !== void 0) {
        child.push(h('div', { class: 'q-table__separator col' }))
        child.push(h('div', { class: 'q-table__control' }, [topRight(marginalsScope.value)]))
      }
      if (child.length === 0) return
      return h('div', { class: topClass }, child)
    }
    const headerSelectedValue = computed(() =>
      someRowsSelected.value === true ? null : allRowsSelected.value,
    )
    function getTHead() {
      const child = getTHeadTR()
      if (props.loading === true && slots.loading === void 0) {
        child.push(
          h('tr', { class: 'q-table__progress' }, [
            h(
              'th',
              {
                class: 'relative-position',
                colspan: computedColspan.value,
              },
              getProgress(),
            ),
          ]),
        )
      }
      return h('thead', child)
    }
    function getTHeadTR() {
      const header = slots.header,
        headerCell = slots['header-cell']
      if (header !== void 0) {
        return header(getHeaderScope({ header: true })).slice()
      }
      const child = computedCols.value.map((col) => {
        const headerCellCol = slots[`header-cell-${col.name}`],
          slot = headerCellCol !== void 0 ? headerCellCol : headerCell,
          props2 = getHeaderScope({ col })
        return slot !== void 0
          ? slot(props2)
          : h(
              QTh,
              {
                key: col.name,
                props: props2,
              },
              () => col.label,
            )
      })
      if (singleSelection.value === true && props.grid !== true) {
        child.unshift(h('th', { class: 'q-table--col-auto-width' }, ' '))
      } else if (multipleSelection.value === true) {
        const slot = slots['header-selection']
        const content =
          slot !== void 0
            ? slot(getHeaderScope({}))
            : [
                h(QCheckbox, {
                  color: props.color,
                  modelValue: headerSelectedValue.value,
                  dark: isDark.value,
                  dense: props.dense,
                  'onUpdate:modelValue': onMultipleSelectionSet,
                }),
              ]
        child.unshift(h('th', { class: 'q-table--col-auto-width' }, content))
      }
      return [
        h(
          'tr',
          {
            class: props.tableHeaderClass,
            style: props.tableHeaderStyle,
          },
          child,
        ),
      ]
    }
    function getHeaderScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        sort,
        colsMap: computedColsMap.value,
        color: props.color,
        dark: isDark.value,
        dense: props.dense,
      })
      if (multipleSelection.value === true) {
        injectProp(data, 'selected', () => headerSelectedValue.value, onMultipleSelectionSet)
      }
      return data
    }
    function onMultipleSelectionSet(val) {
      if (someRowsSelected.value === true) {
        val = false
      }
      updateSelection(computedRows.value.map(getRowKey.value), computedRows.value, val)
    }
    const navIcon = computed(() => {
      const ico = [
        props.iconFirstPage || $q.iconSet.table.firstPage,
        props.iconPrevPage || $q.iconSet.table.prevPage,
        props.iconNextPage || $q.iconSet.table.nextPage,
        props.iconLastPage || $q.iconSet.table.lastPage,
      ]
      return $q.lang.rtl === true ? ico.reverse() : ico
    })
    function getBottomDiv() {
      if (props.hideBottom === true) return
      if (nothingToDisplay.value === true) {
        if (props.hideNoData === true) return
        const message =
          props.loading === true
            ? props.loadingLabel || $q.lang.table.loading
            : props.filter
              ? props.noResultsLabel || $q.lang.table.noResults
              : props.noDataLabel || $q.lang.table.noData
        const noData = slots['no-data']
        const children =
          noData !== void 0
            ? [noData({ message, icon: $q.iconSet.table.warning, filter: props.filter })]
            : [
                h(QIcon, {
                  class: 'q-table__bottom-nodata-icon',
                  name: $q.iconSet.table.warning,
                }),
                message,
              ]
        return h('div', { class: bottomClass + ' q-table__bottom--nodata' }, children)
      }
      const bottom = slots.bottom
      if (bottom !== void 0) {
        return h('div', { class: bottomClass }, [bottom(marginalsScope.value)])
      }
      const child =
        props.hideSelectedBanner !== true &&
        hasSelectionMode.value === true &&
        rowsSelectedNumber.value > 0
          ? [
              h('div', { class: 'q-table__control' }, [
                h('div', [
                  (props.selectedRowsLabel || $q.lang.table.selectedRecords)(
                    rowsSelectedNumber.value,
                  ),
                ]),
              ]),
            ]
          : []
      if (props.hidePagination !== true) {
        return h(
          'div',
          {
            class: bottomClass + ' justify-end',
          },
          getPaginationDiv(child),
        )
      }
      if (child.length !== 0) {
        return h('div', { class: bottomClass }, child)
      }
    }
    function onPagSelection(pag) {
      setPagination({
        page: 1,
        rowsPerPage: pag.value,
      })
    }
    function getPaginationDiv(child) {
      let control
      const { rowsPerPage } = computedPagination.value,
        paginationLabel = props.paginationLabel || $q.lang.table.pagination,
        paginationSlot = slots.pagination,
        hasOpts = props.rowsPerPageOptions.length > 1
      child.push(h('div', { class: 'q-table__separator col' }))
      hasOpts === true &&
        child.push(
          h('div', { class: 'q-table__control' }, [
            h('span', { class: 'q-table__bottom-item' }, [
              props.rowsPerPageLabel || $q.lang.table.recordsPerPage,
            ]),
            h(QSelect, {
              class: 'q-table__select inline q-table__bottom-item',
              color: props.color,
              modelValue: rowsPerPage,
              options: computedRowsPerPageOptions.value,
              displayValue: rowsPerPage === 0 ? $q.lang.table.allRows : rowsPerPage,
              dark: isDark.value,
              borderless: true,
              dense: true,
              optionsDense: true,
              optionsCover: true,
              'onUpdate:modelValue': onPagSelection,
            }),
          ]),
        )
      if (paginationSlot !== void 0) {
        control = paginationSlot(marginalsScope.value)
      } else {
        control = [
          h('span', rowsPerPage !== 0 ? { class: 'q-table__bottom-item' } : {}, [
            rowsPerPage
              ? paginationLabel(
                  firstRowIndex.value + 1,
                  Math.min(lastRowIndex.value, computedRowsNumber.value),
                  computedRowsNumber.value,
                )
              : paginationLabel(1, filteredSortedRowsNumber.value, computedRowsNumber.value),
          ]),
        ]
        if (rowsPerPage !== 0 && pagesNumber.value > 1) {
          const btnProps = {
            color: props.color,
            round: true,
            dense: true,
            flat: true,
          }
          if (props.dense === true) {
            btnProps.size = 'sm'
          }
          pagesNumber.value > 2 &&
            control.push(
              h(QBtn, {
                key: 'pgFirst',
                ...btnProps,
                icon: navIcon.value[0],
                disable: isFirstPage.value,
                ariaLabel: $q.lang.pagination.first,
                onClick: firstPage,
              }),
            )
          control.push(
            h(QBtn, {
              key: 'pgPrev',
              ...btnProps,
              icon: navIcon.value[1],
              disable: isFirstPage.value,
              ariaLabel: $q.lang.pagination.prev,
              onClick: prevPage,
            }),
            h(QBtn, {
              key: 'pgNext',
              ...btnProps,
              icon: navIcon.value[2],
              disable: isLastPage.value,
              ariaLabel: $q.lang.pagination.next,
              onClick: nextPage,
            }),
          )
          pagesNumber.value > 2 &&
            control.push(
              h(QBtn, {
                key: 'pgLast',
                ...btnProps,
                icon: navIcon.value[3],
                disable: isLastPage.value,
                ariaLabel: $q.lang.pagination.last,
                onClick: lastPage,
              }),
            )
        }
      }
      child.push(h('div', { class: 'q-table__control' }, control))
      return child
    }
    function getGridHeader() {
      const child =
        props.gridHeader === true
          ? [h('table', { class: 'q-table' }, [getTHead()])]
          : props.loading === true && slots.loading === void 0
            ? getProgress()
            : void 0
      return h('div', { class: 'q-table__middle' }, child)
    }
    function getGridBody() {
      const item =
        slots.item !== void 0
          ? slots.item
          : (scope) => {
              const child = scope.cols.map((col) =>
                h('div', { class: 'q-table__grid-item-row' }, [
                  h('div', { class: 'q-table__grid-item-title' }, [col.label]),
                  h('div', { class: 'q-table__grid-item-value' }, [col.value]),
                ]),
              )
              if (hasSelectionMode.value === true) {
                const slot = slots['body-selection']
                const content =
                  slot !== void 0
                    ? slot(scope)
                    : [
                        h(QCheckbox, {
                          modelValue: scope.selected,
                          color: props.color,
                          dark: isDark.value,
                          dense: props.dense,
                          'onUpdate:modelValue': (adding, evt) => {
                            updateSelection([scope.key], [scope.row], adding, evt)
                          },
                        }),
                      ]
                child.unshift(
                  h('div', { class: 'q-table__grid-item-row' }, content),
                  h(QSeparator, { dark: isDark.value }),
                )
              }
              const data = {
                class: ['q-table__grid-item-card' + cardDefaultClass.value, props.cardClass],
                style: props.cardStyle,
              }
              if (props.cardStyleFn !== void 0) {
                data.style = [data.style, props.cardStyleFn(scope.row)]
              }
              if (props.cardClassFn !== void 0) {
                const cls = props.cardClassFn(scope.row)
                if (cls) {
                  data.class[0] += ` ${cls}`
                }
              }
              if (
                props.onRowClick !== void 0 ||
                props.onRowDblclick !== void 0 ||
                props.onRowContextmenu !== void 0
              ) {
                data.class[0] += ' cursor-pointer'
                if (props.onRowClick !== void 0) {
                  data.onClick = (evt) => {
                    emit('RowClick', evt, scope.row, scope.pageIndex)
                  }
                }
                if (props.onRowDblclick !== void 0) {
                  data.onDblclick = (evt) => {
                    emit('RowDblclick', evt, scope.row, scope.pageIndex)
                  }
                }
                if (props.onRowContextmenu !== void 0) {
                  data.onContextmenu = (evt) => {
                    emit('rowContextmenu', evt, scope.row, scope.pageIndex)
                  }
                }
              }
              return h(
                'div',
                {
                  class:
                    'q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3' +
                    (scope.selected === true ? ' q-table__grid-item--selected' : ''),
                },
                [h('div', data, child)],
              )
            }
      return h(
        'div',
        {
          class: ['q-table__grid-content row', props.cardContainerClass],
          style: props.cardContainerStyle,
        },
        computedRows.value.map((row, pageIndex) => {
          return item(
            getBodyScope({
              key: getRowKey.value(row),
              row,
              pageIndex,
            }),
          )
        }),
      )
    }
    Object.assign(vm.proxy, {
      requestServerInteraction,
      setPagination,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      isRowSelected,
      clearSelection: clearSelection2,
      isRowExpanded,
      setExpanded,
      sort,
      resetVirtualScroll,
      scrollTo,
      getCellValue,
    })
    injectMultipleProps(vm.proxy, {
      filteredSortedRows: () => filteredSortedRows.value,
      computedRows: () => computedRows.value,
      computedRowsNumber: () => computedRowsNumber.value,
    })
    return () => {
      const child = [getTopDiv()]
      const data = { ref: rootRef, class: rootContainerClass.value }
      if (props.grid === true) {
        child.push(getGridHeader())
      } else {
        Object.assign(data, {
          class: [data.class, props.cardClass],
          style: props.cardStyle,
        })
      }
      child.push(getBody(), getBottomDiv())
      if (props.loading === true && slots.loading !== void 0) {
        child.push(slots.loading())
      }
      return h('div', data, child)
    }
  },
})
const _sfc_main$2 = {
  __name: 'EditInfo',
  props: {
    modelValue: Boolean,
    first_name: String,
    last_name: String,
    email_address: String,
    phone_number: String,
    relation: String,
    buttons: Array,
  },
  emits: ['update:modelValue', 'updateField', 'close'],
  setup(__props, { emit: __emit }) {
    const props = __props
    const editInfoCard = ref(props.modelValue)
    const FirstName = ref(props.first_name)
    const LastName = ref(props.last_name)
    const EmailAddress = ref(props.email_address)
    const PhoneNumber = ref(props.phone_number)
    const Relation = ref(props.relation)
    const emit = __emit
    const isFormValid = computed(() => {
      return (
        FirstName.value.trim() !== '' &&
        LastName.value.trim() !== '' &&
        EmailAddress.value.trim() !== '' &&
        PhoneNumber.value.trim() !== '' &&
        Relation.value.trim() !== ''
      )
    })
    const handleButton = (button) => {
      if (button.label === 'Edit Info') {
        emit('updateField', {
          first_name: FirstName.value,
          last_name: LastName.value,
          email_address: EmailAddress.value,
          phone_number: PhoneNumber.value,
          relation: Relation.value,
        })
      }
      button.action()
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        editInfoCard.value = newValue
        if (newValue) {
          FirstName.value = props.first_name
          LastName.value = props.last_name
          EmailAddress.value = props.email_address
          PhoneNumber.value = props.phone_number
          Relation.value = props.relation
        }
      },
    )
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createVNode(
            QDialog,
            {
              modelValue: editInfoCard.value,
              'onUpdate:modelValue':
                _cache[5] || (_cache[5] = ($event) => (editInfoCard.value = $event)),
              persistent: '',
            },
            {
              default: withCtx(() => [
                createVNode(
                  QCard,
                  { class: 'my-card' },
                  {
                    default: withCtx(() => [
                      _cache[11] ||
                        (_cache[11] = createBaseVNode(
                          'h5',
                          { class: 'text-xl px-5 pt-5 font-medium text-gray-900 dark:text-white' },
                          ' Edit Emergency Contact ',
                          -1,
                        )),
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
                                modelValue: FirstName.value,
                                'onUpdate:modelValue':
                                  _cache[0] || (_cache[0] = ($event) => (FirstName.value = $event)),
                                placeholder: 'Ama',
                                filled: '',
                                type: 'text',
                                required: '',
                              },
                              {
                                before: withCtx(() => [
                                  createVNode(QIcon, { name: 'fa-regular fa-user' }),
                                ]),
                                _: 1,
                              },
                              8,
                              ['modelValue'],
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
                                modelValue: LastName.value,
                                'onUpdate:modelValue':
                                  _cache[1] || (_cache[1] = ($event) => (LastName.value = $event)),
                                placeholder: 'Henewaa',
                                type: 'text',
                              },
                              {
                                before: withCtx(() => [
                                  createVNode(QIcon, { name: 'fa-regular fa-user' }),
                                ]),
                                _: 1,
                              },
                              8,
                              ['modelValue'],
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
                                modelValue: EmailAddress.value,
                                'onUpdate:modelValue':
                                  _cache[2] ||
                                  (_cache[2] = ($event) => (EmailAddress.value = $event)),
                                placeholder: 'amahenewaa@example.com',
                                type: 'email',
                              },
                              {
                                before: withCtx(() => [
                                  createVNode(QIcon, { name: 'fa-regular fa-envelope' }),
                                ]),
                                _: 1,
                              },
                              8,
                              ['modelValue'],
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
                                modelValue: PhoneNumber.value,
                                'onUpdate:modelValue':
                                  _cache[3] ||
                                  (_cache[3] = ($event) => (PhoneNumber.value = $event)),
                                placeholder: '+233240123456',
                                type: 'text',
                              },
                              {
                                before: withCtx(() => [
                                  createVNode(QIcon, { name: 'fa-solid fa-phone' }),
                                ]),
                                _: 1,
                              },
                              8,
                              ['modelValue'],
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
                                modelValue: Relation.value,
                                'onUpdate:modelValue':
                                  _cache[4] || (_cache[4] = ($event) => (Relation.value = $event)),
                                placeholder: 'Son',
                                type: 'text',
                              },
                              {
                                before: withCtx(() => [
                                  createVNode(QIcon, { name: 'fa-solid fa-people-arrows' }),
                                ]),
                                _: 1,
                              },
                              8,
                              ['modelValue'],
                            ),
                          ]),
                          _: 1,
                          __: [6, 7, 8, 9, 10],
                        },
                      ),
                      createVNode(QSeparator),
                      createVNode(
                        QCardActions,
                        { align: 'around' },
                        {
                          default: withCtx(() => [
                            (openBlock(true),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(__props.buttons, (button, index) => {
                                return (
                                  openBlock(),
                                  createBlock(
                                    QBtn,
                                    {
                                      key: index,
                                      onClick: ($event) => handleButton(button),
                                      flat: '',
                                      icon: button.icon,
                                      label: button.label,
                                      disable: button.label === 'Edit Info' && !isFormValid.value,
                                      style: normalizeStyle({
                                        backgroundColor:
                                          !isFormValid.value && button.label === 'Edit Info'
                                            ? '#d3d3d3'
                                            : '#b7d1ed',
                                      }),
                                    },
                                    null,
                                    8,
                                    ['onClick', 'icon', 'label', 'disable', 'style'],
                                  )
                                )
                              }),
                              128,
                            )),
                          ]),
                          _: 1,
                        },
                      ),
                    ]),
                    _: 1,
                    __: [11],
                  },
                ),
              ]),
              _: 1,
            },
            8,
            ['modelValue'],
          ),
        ])
      )
    }
  },
}
const _hoisted_1$1 = { class: 'flex flex-col items-center pb-5' }
const _hoisted_2$1 = { class: 'py-5 uppercase' }
const _hoisted_3$1 = {
  key: 0,
  class: 'text-xl font-bold text-red-400',
}
const _hoisted_4$1 = { class: 'p-5' }
const _hoisted_5$1 = { class: 'text-lg dark:text-white' }
const _hoisted_6$1 = { key: 0 }
const _hoisted_7$1 = { class: 'font-bold' }
const _hoisted_8$1 = { key: 1 }
const _sfc_main$1 = {
  __name: 'moreActions',
  props: {
    modelValue: Boolean,
    actionType: { type: String, default: '' },
    actionIcon: { type: Array, default: () => [] },
    message: { type: Object, default: () => {} },
    buttons: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue', 'close'],
  setup(__props) {
    const props = __props
    const actions = ref(props.modelValue)
    const handleButton = (button) => {
      button.action()
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        actions.value = newValue
      },
    )
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createVNode(
            QDialog,
            {
              modelValue: actions.value,
              'onUpdate:modelValue':
                _cache[0] || (_cache[0] = ($event) => (actions.value = $event)),
              persistent: '',
            },
            {
              default: withCtx(() => [
                createVNode(
                  QCard,
                  { class: 'my-card' },
                  {
                    default: withCtx(() => [
                      createBaseVNode('div', null, [
                        createBaseVNode('div', _hoisted_1$1, [
                          createBaseVNode('div', _hoisted_2$1, [
                            createBaseVNode('div', null, [
                              __props.actionType === 'delete'
                                ? (openBlock(),
                                  createElementBlock('h5', _hoisted_3$1, [
                                    _cache[1] || (_cache[1] = createTextVNode('Heads Up ')),
                                    createBaseVNode('span', null, [
                                      createVNode(QIcon, { name: unref(fasExclamation) }, null, 8, [
                                        'name',
                                      ]),
                                    ]),
                                  ]))
                                : createCommentVNode('', true),
                            ]),
                          ]),
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(__props.actionIcon, (icon, index) => {
                              return (
                                openBlock(),
                                createBlock(
                                  QIcon,
                                  {
                                    key: index,
                                    name: icon.name,
                                    color: icon.color,
                                    size: 'xl',
                                  },
                                  null,
                                  8,
                                  ['name', 'color'],
                                )
                              )
                            }),
                            128,
                          )),
                          createBaseVNode('div', _hoisted_4$1, [
                            createBaseVNode('div', _hoisted_5$1, [
                              __props.message.highlight
                                ? (openBlock(),
                                  createElementBlock('span', _hoisted_6$1, [
                                    createTextVNode(
                                      toDisplayString(
                                        __props.message.text.split(__props.message.highlight)[0],
                                      ) + ' ',
                                      1,
                                    ),
                                    createBaseVNode(
                                      'strong',
                                      _hoisted_7$1,
                                      toDisplayString(__props.message.highlight),
                                      1,
                                    ),
                                    createTextVNode(
                                      ' ' +
                                        toDisplayString(
                                          __props.message.text.split(__props.message.highlight)[1],
                                        ),
                                      1,
                                    ),
                                  ]))
                                : (openBlock(),
                                  createElementBlock(
                                    'span',
                                    _hoisted_8$1,
                                    toDisplayString(__props.message.text),
                                    1,
                                  )),
                            ]),
                          ]),
                        ]),
                      ]),
                      createVNode(QSeparator),
                      createVNode(
                        QCardActions,
                        { align: 'around' },
                        {
                          default: withCtx(() => [
                            (openBlock(true),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(__props.buttons, (button, index) => {
                                return (
                                  openBlock(),
                                  createBlock(
                                    QBtn,
                                    {
                                      key: index,
                                      onClick: ($event) => handleButton(button),
                                      flat: '',
                                      icon: button.icon,
                                      label: button.label,
                                    },
                                    null,
                                    8,
                                    ['onClick', 'icon', 'label'],
                                  )
                                )
                              }),
                              128,
                            )),
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
            8,
            ['modelValue'],
          ),
        ])
      )
    }
  },
}
const _hoisted_1 = { class: 'h-screen top-5 relative' }
const _hoisted_2 = { class: 'rounded-t mb-0 px-0 py-3 border-0' }
const _hoisted_3 = { class: 'flex flex-wrap items-center' }
const _hoisted_4 = { class: 'relative w-full px-4 max-w-full' }
const _hoisted_5 = { class: 'block w-full overflow-x-auto' }
const _hoisted_6 = { class: 'q-px-md row flex-nowrap q-my-xs q-gutter-x-md justify-between' }
const _hoisted_7 = {
  class: 'q-px-lg text-center q-my-xs q-gutter-x-md column',
  style: {
    'white-space': 'nowrap',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'min-width': '150px',
  },
}
const _hoisted_8 = { class: 'w-auto font-bold' }
const _hoisted_9 = { class: 'w-auto' }
const _hoisted_10 = { class: 'rounded-t mb-10 px-0 py-3 border-0' }
const _hoisted_11 = { class: 'flex flex-wrap items-center' }
const _hoisted_12 = { class: 'relative w-full px-4 max-w-full flex-grow flex-1' }
const _hoisted_13 = { class: 'block w-full overflow-x-auto' }
const _hoisted_14 = { class: 'q-px-md row flex-nowrap q-my-xs q-gutter-x-md justify-between' }
const _hoisted_15 = {
  class: 'q-px-lg text-center q-my-xs q-gutter-x-md column',
  style: {
    'white-space': 'nowrap',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'min-width': '150px',
  },
}
const _hoisted_16 = { class: 'w-auto font-bold' }
const _hoisted_17 = { class: 'w-auto' }
const _sfc_main = {
  __name: 'ContactList',
  setup(__props) {
    const cancel = fasXmark
    const edit = farPenToSquare
    const approve = fasCircleCheck
    const del = farTrashCan
    const rej = farCircleXmark
    const ops = useOperations()
    const toDoTask = ref('')
    const openEdit = ref(false)
    const mainAction = ref(false)
    const cardInfo = ref(null)
    const columns = [
      {
        name: 'name',
        required: true,
        label: 'NAME & EMAIL',
        align: 'center',
        field: (row) => row.first_name,
        format: (val) => `${val}`,
        sortable: true,
      },
      { name: 'phone_number', align: 'center', label: 'PHONE NUMBER', field: 'phone_number' },
      { name: 'relation', label: 'RELATION', align: 'center', field: 'relation' },
      { name: 'status', label: 'STATUS', align: 'center', field: 'status' },
      { name: 'action', label: 'ACTION', align: 'center', field: 'action' },
    ]
    const contactsRows = computed(() => ops.myContacts || [])
    const dependantsRows = computed(() => ops.myDependants || [])
    const actionMessage = computed(() => {
      if (!cardInfo.value) {
        return { text: 'No action selected' }
      }
      const name = `${cardInfo.value.first_name} ${cardInfo.value.last_name}`
      switch (toDoTask.value) {
        case 'delete':
          return {
            text: `Do you want to delete ${name} from your emergency list?`,
            highlight: name,
          }
        case 'approve':
          return { text: `Do you want to approve ${name} as your dependant?`, highlight: name }
        case 'reject':
          return { text: `Do you want to reject ${name} as your dependant?`, highlight: name }
        default:
          return { text: 'No action selected' }
      }
    })
    const actionButtons = computed(() => {
      switch (toDoTask.value) {
        case 'delete':
          return [
            { label: 'Delete', icon: del, color: 'deep-orange', action: deleteCardInfo },
            { label: 'Cancel', icon: cancel, action: onClose },
          ]
        case 'approve':
          return [
            { label: 'Approve', icon: approve, color: 'secondary', action: approveCardInfo },
            { label: 'Cancel', icon: cancel, action: onClose },
          ]
        case 'reject':
          return [
            { label: 'Reject', icon: rej, color: 'deep-orange', action: rejectCardInfo },
            { label: 'Cancel', icon: cancel, action: onClose },
          ]
        default:
          return []
      }
    })
    const actionIcons = computed(() => {
      switch (toDoTask.value) {
        case 'delete':
          return [{ name: del, color: 'deep-orange' }]
        case 'approve':
          return [{ name: approve, color: 'secondary' }]
        case 'reject':
          return [{ name: rej, color: 'deep-orange' }]
        default:
          return []
      }
    })
    const onClose = () => {
      openEdit.value = false
      mainAction.value = false
    }
    const buttonAction = computed(() => {
      return [
        { label: 'Edit Info', icon: edit, action: editCardInfo },
        { label: 'Cancel', icon: cancel, action: onClose },
      ]
    })
    const editCardInfo = async (updatedData) => {
      if (cardInfo.value) {
        Object.assign(cardInfo.value, updatedData)
        await ops.contactUpdate(cardInfo.value)
        openEdit.value = false
      }
    }
    const deleteCardInfo = async () => {
      const deleteForm = new FormData()
      deleteForm.append('pk', cardInfo.value.pk)
      await ops.contactDelete(deleteForm)
      mainAction.value = false
    }
    const approveCardInfo = async () => {
      const approveForm = new FormData()
      approveForm.append('id', cardInfo.value.pk)
      await ops.dependantApproval(approveForm)
      mainAction.value = false
    }
    const rejectCardInfo = async () => {
      const rejectForm = new FormData()
      rejectForm.append('id', cardInfo.value.pk)
      await ops.dependantReject(rejectForm)
      mainAction.value = false
    }
    const editRow = (row) => {
      openEdit.value = true
      cardInfo.value = row
    }
    const deleteRow = (row) => {
      toDoTask.value = 'delete'
      mainAction.value = true
      cardInfo.value = row
    }
    const acceptRow = (row) => {
      toDoTask.value = 'approve'
      mainAction.value = true
      cardInfo.value = row
    }
    const rejectRow = (row) => {
      toDoTask.value = 'reject'
      mainAction.value = true
      cardInfo.value = row
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createBaseVNode('div', _hoisted_2, [
            createBaseVNode('div', _hoisted_3, [
              createBaseVNode('div', _hoisted_4, [
                createBaseVNode('div', _hoisted_5, [
                  createVNode(
                    QTable,
                    {
                      class: 'my-sticky-header-column-table',
                      flat: '',
                      bordered: '',
                      title: 'My Emergency Contact',
                      subtitle:
                        'List of relations you can count on during an emergency. The information can be updated.',
                      rows: contactsRows.value,
                      columns,
                      'row-key': 'name',
                      style: { 'table-layout': 'auto' },
                    },
                    {
                      'body-cell-action': withCtx((props) => [
                        createBaseVNode('div', _hoisted_6, [
                          createVNode(
                            QBtn,
                            {
                              color: 'primary',
                              label: 'Edit',
                              onClick: ($event) => editRow(props.row),
                              size: 'md',
                            },
                            null,
                            8,
                            ['onClick'],
                          ),
                          createVNode(
                            QBtn,
                            {
                              color: 'negative',
                              label: 'Delete',
                              onClick: ($event) => deleteRow(props.row),
                              size: 'md',
                            },
                            null,
                            8,
                            ['onClick'],
                          ),
                        ]),
                      ]),
                      'body-cell-name': withCtx((props) => [
                        createBaseVNode('div', _hoisted_7, [
                          createBaseVNode('div', _hoisted_8, [
                            createBaseVNode('span', null, toDisplayString(props.row.first_name), 1),
                            _cache[2] || (_cache[2] = createTextVNode()),
                            createBaseVNode('span', null, toDisplayString(props.row.last_name), 1),
                          ]),
                          createBaseVNode(
                            'div',
                            _hoisted_9,
                            toDisplayString(props.row.email_address),
                            1,
                          ),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ['rows'],
                  ),
                ]),
              ]),
            ]),
          ]),
          createBaseVNode('div', _hoisted_10, [
            createBaseVNode('div', _hoisted_11, [
              createBaseVNode('div', _hoisted_12, [
                createBaseVNode('div', _hoisted_13, [
                  createVNode(
                    QTable,
                    {
                      class: 'my-sticky-header-column-table',
                      flat: '',
                      bordered: '',
                      title: 'My Dependents',
                      subtitle:
                        'List of relations who count on you during emergency situations. The information can be updated.',
                      rows: dependantsRows.value,
                      columns,
                      'row-key': 'name',
                      style: { 'table-layout': 'auto' },
                    },
                    {
                      'body-cell-action': withCtx((props) => [
                        createBaseVNode('div', _hoisted_14, [
                          createVNode(
                            QBtn,
                            {
                              color: 'primary',
                              label: 'Accept',
                              onClick: ($event) => acceptRow(props.row),
                              size: 'md',
                            },
                            null,
                            8,
                            ['onClick'],
                          ),
                          createVNode(
                            QBtn,
                            {
                              color: 'negative',
                              label: 'Reject',
                              onClick: ($event) => rejectRow(props.row),
                              size: 'md',
                            },
                            null,
                            8,
                            ['onClick'],
                          ),
                        ]),
                      ]),
                      'body-cell-name': withCtx((props) => [
                        createBaseVNode('div', _hoisted_15, [
                          createBaseVNode('div', _hoisted_16, [
                            createBaseVNode('span', null, toDisplayString(props.row.first_name), 1),
                            _cache[3] || (_cache[3] = createTextVNode()),
                            createBaseVNode('span', null, toDisplayString(props.row.last_name), 1),
                          ]),
                          createBaseVNode('div', _hoisted_17, toDisplayString(props.row.email), 1),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ['rows'],
                  ),
                ]),
              ]),
            ]),
          ]),
          cardInfo.value
            ? (openBlock(),
              createBlock(
                _sfc_main$2,
                {
                  key: 0,
                  modelValue: openEdit.value,
                  'onUpdate:modelValue':
                    _cache[0] || (_cache[0] = ($event) => (openEdit.value = $event)),
                  first_name: cardInfo.value.first_name,
                  last_name: cardInfo.value.last_name,
                  email_address: cardInfo.value.email_address,
                  phone_number: cardInfo.value.phone_number,
                  relation: cardInfo.value.relation,
                  buttons: buttonAction.value,
                  onUpdateField: editCardInfo,
                },
                null,
                8,
                [
                  'modelValue',
                  'first_name',
                  'last_name',
                  'email_address',
                  'phone_number',
                  'relation',
                  'buttons',
                ],
              ))
            : createCommentVNode('', true),
          cardInfo.value
            ? (openBlock(),
              createBlock(
                _sfc_main$1,
                {
                  key: 1,
                  modelValue: mainAction.value,
                  'onUpdate:modelValue':
                    _cache[1] || (_cache[1] = ($event) => (mainAction.value = $event)),
                  'action-icon': actionIcons.value,
                  'action-type': toDoTask.value,
                  message: actionMessage.value,
                  buttons: actionButtons.value,
                },
                null,
                8,
                ['modelValue', 'action-icon', 'action-type', 'message', 'buttons'],
              ))
            : createCommentVNode('', true),
        ])
      )
    }
  },
}
export { _sfc_main as default }
