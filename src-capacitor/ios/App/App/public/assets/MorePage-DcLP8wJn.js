import { a as useTabEmits, u as useTabProps, b as useTab, Q as QTabs } from "./QTabs-CSLOTvXe.js";
import { I as createComponent, aL as createDirective, al as cleanEvt, am as client, aM as preventDraggable, a3 as noop, ak as addEvt, ag as stopAndPrevent, ao as position, aN as leftClick, g as getCurrentInstance, r as ref, c as computed, w as watch, h, S as Transition, aO as getNormalizedVNodes, U as hSlot, aP as KeepAlive, ae as hDir, z as withDirectives, aj as prevent, au as stop, a5 as debounce, aQ as setHorizontalScrollPosition, a7 as onDeactivated, a8 as onActivated, R as onBeforeUnmount, L as hMergeSlot, aR as setVerticalScrollPosition, a0 as watchEffect, x as createElementBlock, m as openBlock, f as createVNode, n as withCtx, A as createBaseVNode, C as toDisplayString, F as Fragment, y as renderList, M as createTextVNode, l as createBlock, B as createCommentVNode, Q as QIcon, D as vShow } from "./index-Bs10UzzQ.js";
import { c as clearSelection, b as between } from "./format-D0aLtpjt.js";
import { u as useTimeout } from "./use-timeout-CEFzdXL5.js";
import { u as useDarkProps, b as useDark, a as QCardSection, Q as QCard } from "./QCard-7XTvnQPP.js";
import { Q as QSeparator } from "./QSeparator-C1pDE3mk.js";
import { Q as QResizeObserver } from "./QResizeObserver-_Eg94i7m.js";
import { Q as QScrollObserver } from "./QScrollObserver-DGHeo4nD.js";
import { i as fabWhatsapp, j as fabFacebook, k as fabTwitter, l as fasPhone } from "./index-BEVCGQIV.js";
import "./uid-CiaxOpXt.js";
import "./rtl-DDpZOXNn.js";
const QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod) {
  const dir = {};
  for (const direction of directionList) {
    if (mod[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
const avoidNodeNamesList = ["INPUT", "TEXTAREA"];
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && avoidNodeNamesList.includes(evt.target.nodeName.toUpperCase()) === false && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
const TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value: value2, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value2,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (window.getSelection().toString() !== "") {
            ctx.end(evt);
            return;
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          ctx.styleCleanup?.(true);
          if (evt !== void 0 && ctx.event.dir !== false) stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
        // cannot be passive (ex: iOS scroll)
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup?.();
        delete el.__qtouchswipe;
      }
    }
  }
);
function useRenderCache() {
  let cache = /* @__PURE__ */ Object.create(null);
  return {
    getCache: (key, defaultValue) => cache[key] === void 0 ? cache[key] = typeof defaultValue === "function" ? defaultValue() : defaultValue : cache[key],
    setCache(key, obj) {
      cache[key] = obj;
    },
    hasCache(key) {
      return Object.hasOwnProperty.call(cache, key);
    },
    clearCache(key) {
      if (key !== void 0) {
        delete cache[key];
      } else {
        cache = /* @__PURE__ */ Object.create(null);
      }
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCache } = useRenderCache();
  const { registerTimeout } = useTimeout();
  let panels, forcedPanelTransition;
  const panelTransition = ref(null);
  const panelIndex = { value: null };
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      registerTimeout(() => {
        emit("transition", newVal, oldVal);
      }, props.transitionDuration);
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index !== -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length !== 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCache(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) return;
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
const QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
const QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
const ScrollAreaControls = createComponent({
  props: [
    "store",
    "barStyle",
    "verticalBarStyle",
    "horizontalBarStyle"
  ],
  setup(props) {
    return () => [
      h("div", {
        class: props.store.scroll.vertical.barClass.value,
        style: [props.barStyle, props.verticalBarStyle],
        "aria-hidden": "true",
        onMousedown: props.store.onVerticalMousedown
      }),
      h("div", {
        class: props.store.scroll.horizontal.barClass.value,
        style: [props.barStyle, props.horizontalBarStyle],
        "aria-hidden": "true",
        onMousedown: props.store.onHorizontalMousedown
      }),
      withDirectives(
        h("div", {
          ref: props.store.scroll.vertical.ref,
          class: props.store.scroll.vertical.thumbClass.value,
          style: props.store.scroll.vertical.style.value,
          "aria-hidden": "true"
        }),
        props.store.thumbVertDir
      ),
      withDirectives(
        h("div", {
          ref: props.store.scroll.horizontal.ref,
          class: props.store.scroll.horizontal.thumbClass.value,
          style: props.store.scroll.horizontal.style.value,
          "aria-hidden": "true"
        }),
        props.store.thumbHorizDir
      )
    ];
  }
});
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
const TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone = evt.type.indexOf("mouse") !== -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone);
              evt.cancelBubble === true && stop(clone);
              Object.assign(clone, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) return;
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup?.();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
        // cannot be passive (ex: iOS scroll)
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup?.();
        delete el.__qtouchpan;
      }
    }
  }
);
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
const getMinThumbSize = (size) => size >= 250 ? 50 : Math.ceil(size / 5);
const QScrollArea = createComponent({
  name: "QScrollArea",
  props: {
    ...useDarkProps,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    verticalOffset: {
      type: Array,
      default: [0, 0]
    },
    horizontalOffset: {
      type: Array,
      default: [0, 0]
    },
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    let timer = null, panRefPos;
    const targetRef = ref(null);
    const classes = computed(
      () => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : "")
    );
    Object.assign(container, {
      verticalInner: computed(() => container.vertical.value - props.verticalOffset[0] - props.verticalOffset[1]),
      horizontalInner: computed(() => container.horizontal.value - props.horizontalOffset[0] - props.horizontalOffset[1])
    });
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1);
    scroll.vertical.thumbStart = computed(() => props.verticalOffset[0] + scroll.vertical.percentage.value * (container.verticalInner.value - scroll.vertical.thumbSize.value));
    scroll.vertical.thumbSize = computed(
      () => Math.round(
        between(
          container.verticalInner.value * container.verticalInner.value / scroll.vertical.size.value,
          getMinThumbSize(container.verticalInner.value),
          container.verticalInner.value
        )
      )
    );
    scroll.vertical.style = computed(() => ({
      ...props.thumbStyle,
      ...props.verticalThumbStyle,
      top: `${scroll.vertical.thumbStart.value}px`,
      height: `${scroll.vertical.thumbSize.value}px`,
      right: `${props.horizontalOffset[1]}px`
    }));
    scroll.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(Math.abs(scroll.horizontal.position.value) / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1);
    scroll.horizontal.thumbStart = computed(() => props.horizontalOffset[0] + scroll.horizontal.percentage.value * (container.horizontalInner.value - scroll.horizontal.thumbSize.value));
    scroll.horizontal.thumbSize = computed(
      () => Math.round(
        between(
          container.horizontalInner.value * container.horizontalInner.value / scroll.horizontal.size.value,
          getMinThumbSize(container.horizontalInner.value),
          container.horizontalInner.value
        )
      )
    );
    scroll.horizontal.style = computed(() => ({
      ...props.thumbStyle,
      ...props.horizontalThumbStyle,
      [proxy.$q.lang.rtl === true ? "right" : "left"]: `${scroll.horizontal.thumbStart.value}px`,
      width: `${scroll.horizontal.thumbSize.value}px`,
      bottom: `${props.verticalOffset[1]}px`
    }));
    scroll.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        Object.assign(info, {
          [axis + "Position"]: data.position.value,
          [axis + "Percentage"]: data.percentage.value,
          [axis + "Size"]: data.size.value,
          [axis + "ContainerSize"]: container[axis].value,
          [axis + "ContainerInnerSize"]: container[axis + "Inner"].value
        });
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration);
    }
    function updateContainer({ height, width }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position: position2 }) {
      let change = false;
      if (scroll.vertical.position.value !== position2.top) {
        scroll.vertical.position.value = position2.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position2.left) {
        scroll.horizontal.position.value = position2.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) return;
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const multiplier = (data.size.value - container[axis].value) / (container[axis + "Inner"].value - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const startOffset = axis === "vertical" ? props.verticalOffset[0] : props.horizontalOffset[0];
        const offset = evt[dirProps[axis].offset] - startOffset;
        const thumbStart = data.thumbStart.value - startOffset;
        if (offset < thumbStart || offset > thumbStart + data.thumbSize.value) {
          const targetThumbStart = offset - data.thumbSize.value / 2;
          const percentage = between(targetThumbStart / (container[axis + "Inner"].value - data.thumbSize.value), 0, 1);
          setScroll(percentage * Math.max(0, data.size.value - container[axis].value), axis);
        }
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function startTimer() {
      tempShowing.value = true;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    let mouseEventTimer = null;
    function onMouseenter() {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
      }
      mouseEventTimer = setTimeout(() => {
        mouseEventTimer = null;
        hover.value = true;
      }, proxy.$q.platform.is.ios ? 50 : 0);
    }
    function onMouseleave() {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
        mouseEventTimer = null;
      }
      hover.value = false;
    }
    let scrollPosition = null;
    watch(() => proxy.$q.lang.rtl, (rtl) => {
      if (targetRef.value !== null) {
        setHorizontalScrollPosition(
          targetRef.value,
          Math.abs(scroll.horizontal.position.value) * (rtl === true ? -1 : 1)
        );
      }
    });
    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });
    onActivated(() => {
      if (scrollPosition === null) return;
      const scrollTarget = targetRef.value;
      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });
    onBeforeUnmount(emitScroll.cancel);
    Object.assign(proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration) {
        localSetScrollPosition(
          axis,
          percentage * (scroll[axis].size.value - container[axis].value) * (axis === "horizontal" && proxy.$q.lang.rtl === true ? -1 : 1),
          duration
        );
      }
    });
    const store = {
      scroll,
      thumbVertDir: [[
        TouchPan,
        (e) => {
          onPanThumb(e, "vertical");
        },
        void 0,
        { vertical: true, ...panOpts }
      ]],
      thumbHorizDir: [[
        TouchPan,
        (e) => {
          onPanThumb(e, "horizontal");
        },
        void 0,
        { horizontal: true, ...panOpts }
      ]],
      onVerticalMousedown(evt) {
        onMousedown(evt, "vertical");
      },
      onHorizontalMousedown(evt) {
        onMousedown(evt, "horizontal");
      }
    };
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),
        h(ScrollAreaControls, {
          store,
          barStyle: props.barStyle,
          verticalBarStyle: props.verticalBarStyle,
          horizontalBarStyle: props.horizontalBarStyle
        })
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "text-h6" };
const _hoisted_2$2 = { class: "row no-wrap" };
const _hoisted_3$2 = { class: "video-container" };
const _hoisted_4$1 = ["src"];
const _hoisted_5$1 = { class: "text-subtitle2" };
const _sfc_main$2 = {
  __name: "TipsCard",
  props: {
    cardTitle: String,
    tips: Array
  },
  setup(__props) {
    const props = __props;
    const getEmbedUrl = (url) => {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    };
    watchEffect(() => props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, {
          dark: "",
          class: "bg-grey-9 rounded rounded-md my-card"
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1$2, toDisplayString(__props.cardTitle), 1)
              ]),
              _: 1
            }),
            createVNode(QSeparator, {
              dark: "",
              inset: ""
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(QScrollArea, { style: { "height": "230px", "max-width": "auto" } }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$2, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tips, (item, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          style: { "width": "250px" },
                          class: "q-pa-sm"
                        }, [
                          createVNode(QCard, { class: "my-card" }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_3$2, [
                                createBaseVNode("iframe", {
                                  src: getEmbedUrl(item.vidLink),
                                  frameborder: "0",
                                  allowfullscreen: "",
                                  class: "responsive-video"
                                }, null, 8, _hoisted_4$1)
                              ]),
                              createVNode(QCardSection, { class: "bg-dark" }, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_5$1, toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
};
const _hoisted_1$1 = { class: "relative border-2 border-gray-200 overflow-x-auto shadow-lg sm:rounded-lg" };
const _hoisted_2$1 = { class: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" };
const _hoisted_3$1 = { class: "p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800" };
const _hoisted_4 = { class: "mt-1 text-sm font-normal text-gray-500 dark:text-gray-400" };
const _hoisted_5 = { class: "text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" };
const _hoisted_6 = {
  scope: "row",
  class: "flex px-2 py-2 items-center self-center justify-center font-medium text-gray-900 whitespace-normal dark:text-white"
};
const _hoisted_7 = { class: "flex items-center gap-2 w-full" };
const _hoisted_8 = ["src"];
const _hoisted_9 = { class: "flex-1 text-left break-words" };
const _hoisted_10 = { class: "px-2 py-2" };
const _hoisted_11 = ["href"];
const _hoisted_12 = ["href"];
const _hoisted_13 = ["href"];
const _hoisted_14 = { class: "px-2 py-2" };
const _hoisted_15 = ["href"];
const _hoisted_16 = { class: "px-2 py-2" };
const _hoisted_17 = ["href"];
const _sfc_main$1 = {
  __name: "InfoCard",
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true,
      default: () => []
    },
    titles: {
      type: String,
      required: true
    },
    describe: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    watchEffect(() => props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("table", _hoisted_2$1, [
            createBaseVNode("caption", _hoisted_3$1, [
              createTextVNode(toDisplayString(__props.titles) + " ", 1),
              createBaseVNode("p", _hoisted_4, toDisplayString(__props.describe), 1)
            ]),
            createBaseVNode("thead", _hoisted_5, [
              createBaseVNode("tr", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (col, index) => {
                  return openBlock(), createElementBlock("th", {
                    key: index,
                    scope: "col",
                    class: "px-6 py-3"
                  }, toDisplayString(col.label), 1);
                }), 128))
              ])
            ]),
            createBaseVNode("tbody", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.rows, (row, rowIndex) => {
                return openBlock(), createElementBlock("tr", {
                  key: rowIndex,
                  class: "text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                }, [
                  createBaseVNode("td", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      row.main === "action" || row.main === "action call" ? (openBlock(), createBlock(QIcon, {
                        key: 0,
                        name: row.iconName,
                        size: "sm",
                        class: "flex-shrink-0"
                      }, null, 8, ["name"])) : createCommentVNode("", true),
                      row.main === "agent" ? (openBlock(), createElementBlock("img", {
                        key: 1,
                        src: row.image,
                        class: "h-12 w-12 flex-shrink-0",
                        alt: "Row image"
                      }, null, 8, _hoisted_8)) : createCommentVNode("", true),
                      createBaseVNode("span", _hoisted_9, toDisplayString(row.name), 1)
                    ])
                  ]),
                  createBaseVNode("td", _hoisted_10, [
                    row.main === "action" ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      href: row.link
                    }, toDisplayString(row.actions), 9, _hoisted_11)) : row.main === "action call" ? (openBlock(), createElementBlock("a", {
                      key: 1,
                      href: `tel:${row.link}`
                    }, toDisplayString(row.actions), 9, _hoisted_12)) : (openBlock(), createElementBlock("a", {
                      key: 2,
                      href: `tel:${row.cont_1}`
                    }, toDisplayString(row.cont_1), 9, _hoisted_13))
                  ]),
                  createBaseVNode("td", _hoisted_14, [
                    createBaseVNode("a", {
                      href: `tel:${row.cont_2}`
                    }, toDisplayString(row.cont_2), 9, _hoisted_15)
                  ]),
                  createBaseVNode("td", _hoisted_16, [
                    createBaseVNode("a", {
                      href: `tel:${row.cont_3}`
                    }, toDisplayString(row.cont_3), 9, _hoisted_17)
                  ])
                ]);
              }), 128))
            ])
          ])
        ])
      ]);
    };
  }
};
const police = "" + new URL("police-CIkdsfkP.png", import.meta.url).href;
const fire = "" + new URL("GNFS-4JyGWzZN.jpg", import.meta.url).href;
const nadmo = "" + new URL("nadmo-B1p6hLmf.jpg", import.meta.url).href;
const amb = "" + new URL("ambulance-noHWA0LJ.jpg", import.meta.url).href;
const elec = "" + new URL("ecg-Biqt3Nex.jpg", import.meta.url).href;
const _hoisted_1 = { class: "h-screen" };
const _hoisted_2 = { class: "q-pa-xs" };
const _hoisted_3 = {
  class: "q-gutter-y-md",
  style: { "max-width": "auto" }
};
const ContactTit = "Contact Us";
const contactDescribe = "Tap on an action to get in touch.";
const EmerTit = "Emergency Contacts";
const tableDescribe = "Tap on a contact number to initiate a direct call.";
const _sfc_main = {
  __name: "MorePage",
  setup(__props) {
    const tab = ref("tips");
    const healthTips = [
      { mTitle: "Emergency Tips" },
      {
        vidLink: "https://www.youtube.com/watch?v=qvf_74DM880",
        title: "Cardia Arrest management"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=Ovsw7tdneqE",
        title: "Seizure management"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=2v8vlXgGXwE",
        title: "Bone fracture - First aid"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=hdVKpUR513M",
        title: "Asthma attack - First aid"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=-hnyxw5k-c0",
        title: "Deep cut - First aid"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=lLkw4BXa7pQ",
        title: "Snake bite - First aid"
      }
    ];
    const floodTips = [
      { mTitle: "Flood Tips" },
      {
        vidLink: "https://www.youtube.com/watch?v=43M5mZuzHF8",
        title: "Flood management"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=Hlrbio-NpxQ",
        title: "Drowning - First aid"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=luTRnCoeD4c",
        title: "Electrocution - First aid"
      }
    ];
    const fireTips = [
      { mTitle: "Fire Tips" },
      {
        vidLink: "https://www.youtube.com/watch?v=IHswAPDhVyU",
        title: "Fire Safety"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=dtyl3u3R8wM",
        title: "Extinguisher Usage - First aid"
      },
      {
        vidLink: "https://www.youtube.com/watch?v=NOvnZRzFthg",
        title: "Burns - First aid"
      }
    ];
    const ContactCols = [
      {
        name: "name",
        required: true,
        label: "Medium",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "actions",
        align: "center",
        label: "Action",
        field: "actions"
      }
    ];
    const ContactAction = [
      {
        name: "WhatsApp",
        iconName: fabWhatsapp,
        actions: "+233506053020",
        link: "https://wa.me/233506053020",
        main: "action"
      },
      {
        name: "Facebook",
        iconName: fabFacebook,
        actions: "Visit Facebook",
        link: "https://facebook.com/home",
        main: "action"
      },
      {
        name: "Twitter",
        iconName: fabTwitter,
        actions: "Visit Twitter",
        link: "https://twitter.com/home",
        main: "action"
      },
      {
        name: "Phone Call",
        iconName: fasPhone,
        actions: "Call us",
        link: "+233546045726",
        main: "action call"
      }
    ];
    const cols = [
      {
        name: "name",
        required: true,
        label: "Agency",
        align: "left",
        field: (row) => row.name,
        // field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
        style: "min-width: 150px; max-width: 200px;"
      },
      {
        name: "cont_1",
        align: "center",
        label: "Contact 1",
        field: "cont_1",
        style: "min-width: 150px; max-width: 200px;"
      },
      {
        name: "cont_2",
        align: "center",
        label: "Contact 2",
        field: "cont_2",
        style: "min-width: 150px; max-width: 200px;"
      },
      {
        name: "cont_3",
        align: "center",
        label: "Contact 3",
        field: "cont_3",
        style: "min-width: 150px; max-width: 200px;"
      }
    ];
    const agents = [
      {
        name: "Ghana Police Service",
        image: police,
        cont_1: "191",
        cont_2: "18555",
        cont_3: "+233302773906",
        main: "agent"
      },
      {
        name: "Ghana National Fire Service",
        image: fire,
        cont_1: "192",
        cont_2: "+233302772446",
        cont_3: "+233299340383",
        main: "agent"
      },
      {
        name: "National Ambulance Service",
        image: amb,
        cont_1: "+2330501614877",
        cont_2: "+2330505982870",
        cont_3: "",
        main: "agent"
      },
      {
        name: "National Disaster Management Organisation",
        image: nadmo,
        cont_1: "112",
        cont_2: "+233299350030",
        cont_3: "+233302964884",
        main: "agent"
      },
      {
        name: "Electricity Company of Ghana",
        image: elec,
        cont_1: "+233302676727",
        cont_2: "+233302611611",
        cont_3: "+233302676728",
        main: "agent"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QTabs, {
                  modelValue: tab.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
                  dense: "",
                  class: "bg-grey-2 text-grey-7",
                  "active-color": "primary",
                  "indicator-color": "purple",
                  align: "justify"
                }, {
                  default: withCtx(() => [
                    createVNode(QTab, {
                      name: "tips",
                      label: "Safety Tips"
                    }),
                    createVNode(QTab, {
                      name: "emergency",
                      label: "Emergency Lines"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(QTabPanels, {
                  modelValue: tab.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
                  animated: "",
                  class: "q-pa-none bg-opacity-95 text-white"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QTabPanel, {
                      name: "tips",
                      class: "q-gutter-y-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, {
                          "card-title": healthTips[0].mTitle,
                          tips: healthTips.slice(1)
                        }, null, 8, ["card-title", "tips"]),
                        createVNode(_sfc_main$2, {
                          "card-title": floodTips[0].mTitle,
                          tips: floodTips.slice(1)
                        }, null, 8, ["card-title", "tips"]),
                        createVNode(_sfc_main$2, {
                          "card-title": fireTips[0].mTitle,
                          tips: fireTips.slice(1)
                        }, null, 8, ["card-title", "tips"])
                      ]),
                      _: 1
                    }, 512), [
                      [vShow, tab.value === "tips"]
                    ]),
                    createVNode(QTabPanel, {
                      name: "emergency",
                      class: "q-gutter-y-lg q-py-xl"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1, {
                          titles: EmerTit,
                          describe: tableDescribe,
                          columns: cols,
                          rows: agents
                        }),
                        createVNode(_sfc_main$1, {
                          titles: ContactTit,
                          describe: contactDescribe,
                          columns: ContactCols,
                          rows: ContactAction
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
