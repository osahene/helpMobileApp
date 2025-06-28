import { I as createComponent, J as useRouterLinkProps, K as useRouterLink, c as computed, w as watch, h, L as hMergeSlot, r as ref, o as onMounted, k as resolveComponent, l as createBlock, m as openBlock, n as withCtx, f as createVNode, A as createBaseVNode, B as createCommentVNode, M as createTextVNode, C as toDisplayString } from "./index-Bs10UzzQ.js";
import { u as useTabProps, a as useTabEmits, b as useTab, Q as QTabs } from "./QTabs-CSLOTvXe.js";
import { Q as QFooter } from "./QFooter-5cZlzQXB.js";
import { Q as QPageContainer, a as QLayout } from "./QLayout-KclAkh4H.js";
import { u as useOperations } from "./ops-Dc5so7QF.js";
import "./uid-CiaxOpXt.js";
import "./QResizeObserver-_Eg94i7m.js";
import "./use-timeout-CEFzdXL5.js";
import "./rtl-DDpZOXNn.js";
import "./QScrollObserver-DGHeo4nD.js";
import "./axiosInstance-9n5X4jXu.js";
import "./axios-DsnWYMmf.js";
const QRouteTab = createComponent({
  name: "QRouteTab",
  props: {
    ...useRouterLinkProps,
    ...useTabProps
  },
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const routeData = useRouterLink({
      useDisableForRouterLinkProps: false
    });
    const { renderTab, $tabs } = useTab(
      props,
      slots,
      emit,
      {
        exact: computed(() => props.exact),
        ...routeData
      }
    );
    watch(
      () => `${props.name} | ${props.exact} | ${(routeData.resolvedLink.value || {}).href}`,
      $tabs.verifyRouteModel
    );
    return () => renderTab(routeData.linkTag.value, routeData.linkAttrs.value);
  }
});
const alignValues = ["top", "middle", "bottom"];
const QBadge = createComponent({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: (v) => alignValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0 ? { verticalAlign: props.align } : null;
    });
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return `q-badge flex inline items-center no-wrap q-badge--${props.multiLine === true ? "multi" : "single"}-line` + (props.outline === true ? " q-badge--outline" : props.color !== void 0 ? ` bg-${props.color}` : "") + (text !== void 0 ? ` text-${text}` : "") + (props.floating === true ? " q-badge--floating" : "") + (props.rounded === true ? " q-badge--rounded" : "") + (props.transparent === true ? " q-badge--transparent" : "");
    });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      role: "status",
      "aria-label": props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [props.label] : []));
  }
});
const _hoisted_1 = { class: "relative" };
const _hoisted_2 = { class: "md:px-10 mx-auto w-full" };
const _sfc_main = {
  __name: "PagesLayout",
  setup(__props) {
    const tab = ref("home");
    const ops = useOperations();
    onMounted(async () => {
      await ops.getMyContacts();
      await ops.getMyDependant();
    });
    const countDeps = computed(() => ops.myDependants || []);
    const pendingCount = computed(() => {
      return countDeps.value.filter((dep) => dep.status === "pending").length;
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(QLayout, { view: "hHh lpR fFf" }, {
        default: withCtx(() => [
          createVNode(QPageContainer, {
            fullscreen: "",
            class: "bg-cust-white"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(_component_router_view),
                  createVNode(QFooter, null, {
                    default: withCtx(() => [
                      createVNode(QTabs, {
                        modelValue: tab.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
                        align: "justify",
                        dense: "",
                        class: "bg-white text-red shadow-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(QRouteTab, {
                            to: "/pages/home",
                            name: "home",
                            icon: "home",
                            class: "q-pa-sm"
                          }),
                          createVNode(QRouteTab, {
                            to: "/pages/edit",
                            name: "edit",
                            icon: "edit"
                          }),
                          createVNode(QRouteTab, {
                            to: "/pages/list",
                            name: "lists",
                            icon: "list"
                          }, {
                            default: withCtx(() => [
                              pendingCount.value > 0 ? (openBlock(), createBlock(QBadge, {
                                key: 0,
                                color: "purple",
                                "text-color": "white",
                                floating: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(pendingCount.value), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(QRouteTab, {
                            to: "/pages/more",
                            name: "more",
                            icon: "more"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
