import { u as unref, p as getCurrentScope, q as onScopeDispose, t as reactive, c as computed, r as ref, w as watch, v as useRouter, o as onMounted, l as createBlock, m as openBlock, n as withCtx, x as createElementBlock, f as createVNode, F as Fragment, y as renderList, z as withDirectives, A as createBaseVNode, Q as QIcon, B as createCommentVNode, C as toDisplayString, D as vShow, E as QBtn, G as withModifiers, H as normalizeClass } from "./index-Bs10UzzQ.js";
import { Q as QFooter } from "./QFooter-5cZlzQXB.js";
import { Q as QPage } from "./QPage-DCmqepVD.js";
import { f as fasTruckFast, a as fasBookBible } from "./index-BEVCGQIV.js";
import "./QResizeObserver-_Eg94i7m.js";
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useSwipe(target, options = {}) {
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    passive = true,
    window: window2 = defaultWindow
  } = options;
  const coordsStart = reactive({ x: 0, y: 0 });
  const coordsEnd = reactive({ x: 0, y: 0 });
  const diffX = computed(() => coordsStart.x - coordsEnd.x);
  const diffY = computed(() => coordsStart.y - coordsEnd.y);
  const { max, abs } = Math;
  const isThresholdExceeded = computed(() => max(abs(diffX.value), abs(diffY.value)) >= threshold);
  const isSwiping = ref(false);
  const direction = computed(() => {
    if (!isThresholdExceeded.value)
      return "none";
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? "left" : "right";
    } else {
      return diffY.value > 0 ? "up" : "down";
    }
  });
  const getTouchEventCoords = (e) => [e.touches[0].clientX, e.touches[0].clientY];
  const updateCoordsStart = (x, y) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };
  const updateCoordsEnd = (x, y) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };
  let listenerOptions;
  const isPassiveEventSupported = checkPassiveEventSupport(window2 == null ? void 0 : window2.document);
  if (!passive)
    listenerOptions = isPassiveEventSupported ? { passive: false, capture: true } : { capture: true };
  else
    listenerOptions = isPassiveEventSupported ? { passive: true } : { capture: false };
  const onTouchEnd = (e) => {
    if (isSwiping.value)
      onSwipeEnd == null ? void 0 : onSwipeEnd(e, direction.value);
    isSwiping.value = false;
  };
  const stops = [
    useEventListener(target, "touchstart", (e) => {
      if (e.touches.length !== 1)
        return;
      if (listenerOptions.capture && !listenerOptions.passive)
        e.preventDefault();
      const [x, y] = getTouchEventCoords(e);
      updateCoordsStart(x, y);
      updateCoordsEnd(x, y);
      onSwipeStart == null ? void 0 : onSwipeStart(e);
    }, listenerOptions),
    useEventListener(target, "touchmove", (e) => {
      if (e.touches.length !== 1)
        return;
      const [x, y] = getTouchEventCoords(e);
      updateCoordsEnd(x, y);
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null ? void 0 : onSwipe(e);
    }, listenerOptions),
    useEventListener(target, ["touchend", "touchcancel"], onTouchEnd, listenerOptions)
  ];
  const stop = () => stops.forEach((s) => s());
  return {
    isPassiveEventSupported,
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop
  };
}
function checkPassiveEventSupport(document2) {
  if (!document2)
    return false;
  let supportsPassive = false;
  const optionsBlock = {
    get passive() {
      supportsPassive = true;
      return false;
    }
  };
  document2.addEventListener("x", noop, optionsBlock);
  document2.removeEventListener("x", noop);
  return supportsPassive;
}
const mainLogo = "" + new URL("Help Logo-DcakNI6b.svg", import.meta.url).href;
const _hoisted_1 = { class: "text-content" };
const _hoisted_2 = { class: "title q-ma-none" };
const _hoisted_3 = {
  key: 0,
  class: "title q-ma-none"
};
const _hoisted_4 = { class: "messages text-weight-light" };
const _hoisted_5 = { class: "indicators row justify-center" };
const _sfc_main = {
  __name: "IndexPage",
  setup(__props) {
    const router = useRouter();
    const onBoardSteps = [
      {
        id: 1,
        title: "Welcome to",
        title2: "Help OO Help",
        logo: "img:" + mainLogo,
        message: "Use our system to swiftly get in touch with loved ones in serious moments of crisis with just 2 taps."
      },
      {
        id: 2,
        title: "Swift Info Sharing",
        logo: fasTruckFast,
        message: "Share the most essential situation with your loved ones without doing much."
      },
      {
        id: 3,
        title: "Safety Tips",
        logo: fasBookBible,
        message: "Share the most essential situation with your loved ones without doing much."
      }
    ];
    const currentStep = ref(0);
    const completeOnboaard = () => {
      const countView = parseInt(localStorage.getItem("onBoardCount") || "0", 10);
      if (countView < 2) {
        localStorage.setItem("onBoardCount", "true");
        router.push({ path: "/auth/login" });
      } else {
        router.push({ path: "/auth/login" });
      }
    };
    const nextStep = () => {
      if (currentStep.value < onBoardSteps.length - 1) {
        currentStep.value++;
      } else {
        completeOnboaard();
      }
    };
    const SkipOnboard = () => {
      completeOnboaard();
    };
    const swipeArea = ref(null);
    useSwipe(swipeArea, {});
    onMounted(() => {
      const footer = document.querySelector(".footer-animate");
      footer.classList.add("punch-in");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "flex flex-center column q-pa-md" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList(onBoardSteps, (item, index) => {
            return withDirectives(createBaseVNode("div", {
              key: item.id,
              class: "onboard-content fade"
            }, [
              createVNode(QIcon, {
                name: item.logo,
                class: "logo"
              }, null, 8, ["name"]),
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("h4", _hoisted_2, toDisplayString(item.title), 1),
                item.title2 ? (openBlock(), createElementBlock("h4", _hoisted_3, toDisplayString(item.title2), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("h5", _hoisted_4, toDisplayString(item.message), 1)
            ]), [
              [vShow, currentStep.value === index]
            ]);
          }), 64)),
          createVNode(QFooter, { class: "q-px-lg transparent q-py-sm flex justify-between items-center w-full bottom-0 footer-animate" }, {
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(QBtn, {
                  push: "",
                  color: "primary",
                  onClick: withModifiers(SkipOnboard, ["prevent"]),
                  size: "md",
                  label: "Skip"
                })
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_5, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(onBoardSteps, (item, idx) => {
                    return createBaseVNode("div", {
                      key: item.id,
                      class: normalizeClass(["indicator", { active: idx === currentStep.value }])
                    }, null, 2);
                  }), 64))
                ])
              ]),
              createBaseVNode("div", null, [
                createVNode(QBtn, {
                  label: currentStep.value === onBoardSteps.length - 1 ? "Get Started" : "",
                  onClick: withModifiers(nextStep, ["prevent"]),
                  rounded: "",
                  class: "flex items-center text-weight-light",
                  color: "primary",
                  size: "md"
                }, {
                  default: withCtx(() => [
                    currentStep.value < onBoardSteps.length - 1 ? (openBlock(), createBlock(QIcon, {
                      key: 0,
                      name: "fas fa-arrow-right fa-fade",
                      class: "q-ml-sm"
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["label"])
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
