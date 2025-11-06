import { aU as Platform } from './index-Bs10UzzQ.js'
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection()
    if (selection.empty !== void 0) {
      selection.empty()
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges()
      Platform.is.mobile !== true && selection.addRange(document.createRange())
    }
  } else if (document.selection !== void 0) {
    document.selection.empty()
  }
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v))
}
function normalizeToInterval(v, min, max) {
  if (max <= min) {
    return min
  }
  const size = max - min + 1
  let index = min + ((v - min) % size)
  if (index < min) {
    index = size + index
  }
  return index === 0 ? 0 : index
}
export { between as b, clearSelection as c, normalizeToInterval as n }
