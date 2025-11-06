import { Q as QPageContainer, a as QLayout } from './QLayout-KclAkh4H.js'
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.js'
import {
  k as resolveComponent,
  l as createBlock,
  m as openBlock,
  n as withCtx,
  f as createVNode,
} from './index-Bs10UzzQ.js'
import './QScrollObserver-DGHeo4nD.js'
import './QResizeObserver-_Eg94i7m.js'
const _sfc_main = {}
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent('router-view')
  return (
    openBlock(),
    createBlock(
      QLayout,
      { view: 'lHh Lpr lFf' },
      {
        default: withCtx(() => [
          createVNode(
            QPageContainer,
            { class: 'bg-cust-dark q-pa-sm' },
            {
              default: withCtx(() => [createVNode(_component_router_view)]),
              _: 1,
            },
          ),
        ]),
        _: 1,
      },
    )
  )
}
const AuthLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [['render', _sfc_render]])
export { AuthLayout as default }
