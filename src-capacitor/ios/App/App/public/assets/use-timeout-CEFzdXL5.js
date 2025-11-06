import {
  a7 as onDeactivated,
  R as onBeforeUnmount,
  a4 as nextTick,
  X as vmIsDestroyed,
  g as getCurrentInstance,
} from './index-Bs10UzzQ.js'
function useTick() {
  let tickFn
  const vm = getCurrentInstance()
  function removeTick() {
    tickFn = void 0
  }
  onDeactivated(removeTick)
  onBeforeUnmount(removeTick)
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn()
          tickFn = void 0
        }
      })
    },
  }
}
function useTimeout() {
  let timer = null
  const vm = getCurrentInstance()
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }
  onDeactivated(removeTimeout)
  onBeforeUnmount(removeTimeout)
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout()
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null
          fn()
        }, delay)
      }
    },
  }
}
export { useTick as a, useTimeout as u }
