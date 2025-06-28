const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-DbO7umv_.js","./index-Bs10UzzQ.js","./index-Co5KhmHr.css","./index-CTWF5qpt.js"])))=>i.map(i=>d[i]);
import { Q as QPage } from "./QPage-DCmqepVD.js";
import { c as computed, I as createComponent, r as ref, P as isRuntimeSsrPreHydration, o as onMounted, h, S as Transition, U as hSlot, V as QSpinner, w as watch, X as vmIsDestroyed, g as getCurrentInstance, v as useRouter, x as createElementBlock, m as openBlock, f as createVNode, n as withCtx, A as createBaseVNode, Q as QIcon, u as unref, C as toDisplayString, F as Fragment, y as renderList, l as createBlock, E as QBtn, M as createTextVNode, B as createCommentVNode, Y as registerPlugin, _ as __vitePreload, Z as Capacitor, $ as App, a0 as watchEffect, R as onBeforeUnmount } from "./index-Bs10UzzQ.js";
import { Q as QCard, a as QCardSection } from "./QCard-7XTvnQPP.js";
import { u as useTimeout } from "./use-timeout-CEFzdXL5.js";
import { Q as QSeparator } from "./QSeparator-C1pDE3mk.js";
import { Q as QCardActions, a as QDialog } from "./QDialog-SglhtH9C.js";
import { b as fasExclamation } from "./index-BEVCGQIV.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { u as useOperations } from "./ops-Dc5so7QF.js";
import { u as useQuasar } from "./use-quasar-CD5xJ-Qg.js";
import "./focus-manager-B-vefqia.js";
import "./axiosInstance-9n5X4jXu.js";
import "./axios-DsnWYMmf.js";
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 1.7778;
const QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    loadingShowDelay: {
      type: [Number, String],
      default: 0
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    errorSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    const vm = getCurrentInstance();
    const { registerTimeout: registerLoadTimeout, removeTimeout: removeLoadTimeout } = useTimeout();
    const { registerTimeout: registerLoadShowTimeout, removeTimeout: removeLoadShowTimeout } = useTimeout();
    const placeholderImg = computed(() => props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null);
    const errorImg = computed(() => props.errorSrc !== void 0 ? { src: props.errorSrc, __qerror: true } : null);
    const images = [
      ref(null),
      ref(placeholderImg.value)
    ];
    const position = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition q-img__image--`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    function setLoading() {
      removeLoadShowTimeout();
      if (props.loadingShowDelay === 0) {
        isLoading.value = true;
        return;
      }
      registerLoadShowTimeout(() => {
        isLoading.value = true;
      }, props.loadingShowDelay);
    }
    function clearLoading() {
      removeLoadShowTimeout();
      isLoading.value = false;
    }
    function onLoad({ target }) {
      if (vmIsDestroyed(vm) === false) {
        removeLoadTimeout();
        naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
        waitForCompleteness(target, 1);
      }
    }
    function waitForCompleteness(target, count) {
      if (count === 1e3 || vmIsDestroyed(vm) === true) return;
      if (target.complete === true) {
        onReady(target);
      } else {
        registerLoadTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(target) {
      if (vmIsDestroyed(vm) === true) return;
      position.value = position.value ^ 1;
      images[position.value].value = null;
      clearLoading();
      if (target.getAttribute("__qerror") !== "true") {
        hasError.value = false;
      }
      emit("load", target.currentSrc || target.src);
    }
    function onError(err) {
      removeLoadTimeout();
      clearLoading();
      hasError.value = true;
      images[position.value].value = errorImg.value;
      images[position.value ^ 1].value = placeholderImg.value;
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        alt: props.alt,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position.value === index) {
        Object.assign(data, {
          class: data.class + "current",
          onLoad,
          onError
        });
      } else {
        data.class += "loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value === false) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      let watchSrc = function() {
        watch(
          () => props.src || props.srcset || props.sizes ? {
            src: props.src,
            srcset: props.srcset,
            sizes: props.sizes
          } : null,
          (imgProps) => {
            removeLoadTimeout();
            hasError.value = false;
            if (imgProps === null) {
              clearLoading();
              images[position.value ^ 1].value = placeholderImg.value;
            } else {
              setLoading();
            }
            images[position.value].value = imgProps;
          },
          { immediate: true }
        );
      };
      if (isRuntimeSsrPreHydration.value === true) {
        onMounted(watchSrc);
      } else {
        watchSrc();
      }
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (images[0].value !== null) {
        content.push(
          getImage(0)
        );
      }
      if (images[1].value !== null) {
        content.push(
          getImage(1)
        );
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        key: "main",
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
const _hoisted_1$3 = { class: "mt-5 text-xl font-bold text-red-400" };
const _hoisted_2$2 = { class: "text-h5 font-bold q-mt-sm q-mb-xs" };
const _hoisted_3$2 = { class: "px-4" };
const _hoisted_4$1 = { class: "text-lg pt-5 text-black" };
const _sfc_main$3 = {
  __name: "TriggerCard",
  props: {
    modelValue: Boolean,
    cardName1: String,
    cardName2: String,
    cardImage: String,
    message: String,
    buttons: Array
  },
  emits: ["update:modelValue", "close"],
  setup(__props) {
    const router = useRouter();
    const props = __props;
    const localDialogOpen = ref(props.modelValue);
    const handleButtonClick = (button) => {
      if (button.route) {
        router.push(button.route);
      } else if (button.action) {
        button.action();
      }
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        localDialogOpen.value = newValue;
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QDialog, {
          modelValue: localDialogOpen.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localDialogOpen.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card",
              flat: "",
              bordered: ""
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { horizontal: "" }, {
                  default: withCtx(() => [
                    createVNode(QCardSection, { class: "q-pt-xs text-center" }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_1$3, [
                          _cache[1] || (_cache[1] = createBaseVNode("span", null, "Heads Up", -1)),
                          createVNode(QIcon, { name: unref(fasExclamation) }, null, 8, ["name"])
                        ]),
                        createBaseVNode("div", _hoisted_2$2, [
                          createBaseVNode("span", _hoisted_3$2, toDisplayString(__props.cardName1), 1),
                          createBaseVNode("span", null, toDisplayString(__props.cardName2), 1)
                        ]),
                        createBaseVNode("div", _hoisted_4$1, toDisplayString(__props.message), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(QCardSection, { class: "col-5 flex flex-center" }, {
                      default: withCtx(() => [
                        createVNode(QImg, {
                          class: "rounded-borders h-32 w-32",
                          src: __props.cardImage
                        }, null, 8, ["src"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(QSeparator),
                createVNode(QCardActions, { align: "around" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.buttons, (button, index) => {
                      return openBlock(), createBlock(QBtn, {
                        key: index,
                        onClick: ($event) => handleButtonClick(button),
                        flat: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(button.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10000]"
};
const _hoisted_2$1 = { class: "bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center" };
const _hoisted_3$1 = { class: "text-8xl font-bold my-8 text-red-500" };
const _sfc_main$2 = {
  __name: "RobberyCountdown",
  props: {
    duration: {
      type: Number,
      default: 5
    }
  },
  emits: ["cancel", "complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = ref(false);
    const countdown = ref(props.duration);
    let countdownInterval = null;
    const start = () => {
      visible.value = true;
      countdown.value = props.duration;
      countdownInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(countdownInterval);
          emit("complete");
          visible.value = false;
        }
      }, 1e3);
    };
    const cancel = () => {
      clearInterval(countdownInterval);
      visible.value = false;
      emit("cancel");
    };
    __expose({ start });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "fade" }, {
        default: withCtx(() => [
          visible.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$1, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-3xl font-bold text-red-600 mb-4" }, " ROBBERY ALERT TRIGGERED! ", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-xl mb-6" }, " Broadcasting to your emergency contacts in: ", -1)),
              createBaseVNode("div", _hoisted_3$1, toDisplayString(countdown.value), 1),
              createVNode(QBtn, {
                color: "negative",
                size: "lg",
                class: "w-full py-3 text-lg",
                onClick: cancel
              }, {
                default: withCtx(() => _cache[0] || (_cache[0] = [
                  createTextVNode(" CANCEL ALERT ")
                ])),
                _: 1,
                __: [0]
              })
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
};
const RobberyCountdown = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d7cbb035"]]);
function s(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return new Proxy({}, {
          get(w, o) {
            return (c, p, r) => {
              const i = t.Capacitor.Plugins[n];
              if (i === void 0) {
                r(new Error(`Capacitor plugin ${n} not found`));
                return;
              }
              if (typeof i[o] != "function") {
                r(new Error(`Method ${o} not found in Capacitor plugin ${n}`));
                return;
              }
              (async () => {
                try {
                  const a = await i[o](c);
                  p(a);
                } catch (a) {
                  r(a);
                }
              })();
            };
          }
        });
      }
    }
  );
}
function u(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return t.cordova.plugins[n];
      }
    }
  );
}
function f(t = false) {
  typeof window > "u" || (window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t ? s(window) : window.cordova !== void 0 && u(window));
}
const Geolocation = registerPlugin("Geolocation", {
  web: () => __vitePreload(() => import("./web-DbO7umv_.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then((m) => new m.GeolocationWeb())
});
f();
const isNativePlatform = () => {
  const isNative = Capacitor.isNativePlatform();
  return {
    App: isNative ? App : {
      addListener: () => ({ remove: () => {
      } })
    },
    isNative
  };
};
const _hoisted_1$1 = { class: "flex flex-col border-gray-900 justify-between backdrop-filter backdrop-blur-sm bg-opacity-10 bg-slate-200 overflow-hidden border-4 border-gray-200 rounded-xl shadow shadow-2xl" };
const _hoisted_2 = { class: "py-10 flex flex-col justify-center items-start content-fit" };
const _hoisted_3 = { class: "ml-3 flex flex-col items-start" };
const _hoisted_4 = { class: "head-title font-bold text-black text-[20px] xs:text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]" };
const _hoisted_5 = { class: "head-title font-bold text-black text-[20px] xs:text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]" };
const _hoisted_6 = { class: "ml-3 relative flex xs:top-[10px] sm:top-[30px] md:top-[50px] xs:z-[2] justify-start" };
const _hoisted_7 = ["src"];
const _sfc_main$1 = {
  __name: "HomeCard",
  props: {
    cardTitle: {
      type: String
    },
    cardTitle2: {
      type: String
    },
    cardImg: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    watchEffect(() => props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("p", _hoisted_4, toDisplayString(__props.cardTitle), 1),
            createBaseVNode("p", _hoisted_5, toDisplayString(__props.cardTitle2), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("img", {
            class: "card-img rounded-t-lg h-[10px] xs:h-[100px] sm:h-[150px]",
            src: __props.cardImg
          }, null, 8, _hoisted_7)
        ])
      ]);
    };
  }
};
const healthImg = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%201024%201024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M848.745%20112.64h61.44c5.657%200%2010.24%204.583%2010.24%2010.24v61.44c0%2067.865-55.015%20122.88-122.88%20122.88h-112.64c-67.865%200-122.88-55.015-122.88-122.88v-61.44c0-5.657%204.583-10.24%2010.24-10.24h61.44c11.311%200%2020.48-9.169%2020.48-20.48s-9.169-20.48-20.48-20.48h-61.44c-28.278%200-51.2%2022.922-51.2%2051.2v61.44c0%2090.486%2073.354%20163.84%20163.84%20163.84h112.64c90.486%200%20163.84-73.354%20163.84-163.84v-61.44c0-28.278-22.922-51.2-51.2-51.2h-61.44c-11.311%200-20.48%209.169-20.48%2020.48s9.169%2020.48%2020.48%2020.48z'/%3e%3cpath%20d='M725.865%20343.04v423.936c0%2028.113-23.087%2051.2-51.2%2051.2h-81.92c-11.311%200-20.48%209.169-20.48%2020.48s9.169%2020.48%2020.48%2020.48h81.92c50.735%200%2092.16-41.425%2092.16-92.16V343.04c0-11.311-9.169-20.48-20.48-20.48s-20.48%209.169-20.48%2020.48z'/%3e%3cpath%20d='M572.265%20834.56c0-42.418-34.382-76.8-76.8-76.8s-76.8%2034.382-76.8%2076.8%2034.382%2076.8%2076.8%2076.8%2076.8-34.382%2076.8-76.8zm40.96%200c0%2065.04-52.72%20117.76-117.76%20117.76s-117.76-52.72-117.76-117.76%2052.72-117.76%20117.76-117.76%20117.76%2052.72%20117.76%20117.76zM490.194%20349.189c55.982%2055.982%2055.982%20146.752%200%20202.747L338.13%20703.989c-19.989%2019.989-52.412%2019.989-72.401%200L113.663%20551.933c-55.981-55.993-55.981-146.762.003-202.746%2051.387-51.376%20132.065-55.602%20188.263-12.676%2056.198-42.926%20136.876-38.7%20188.265%2012.678zm-202.746%2028.963c-39.987-39.987-104.824-39.987-144.82%200-39.987%2039.987-39.987%20104.824%200%20144.819l152.064%20152.054c3.993%203.993%2010.482%203.993%2014.475%200l152.062-152.052c39.989-39.997%2039.989-104.835.003-144.82-39.997-39.989-104.835-39.989-144.821-.002-7.998%207.998-20.965%207.998-28.963%200z'/%3e%3c/svg%3e";
const handcuffsImg = "" + new URL("handcuffs-DHfgoBgT.svg", import.meta.url).href;
const fireImg = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='-33%200%20255%20255'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20preserveAspectRatio='xMidYMid'%3e%3cdefs%3e%3cstyle%3e%20.cls-3%20{%20fill:%20url(%23linear-gradient-1);%20}%20.cls-4%20{%20fill:%20%23fc9502;%20}%20.cls-5%20{%20fill:%20%23fce202;%20}%20%3c/style%3e%3clinearGradient%20id='linear-gradient-1'%20gradientUnits='userSpaceOnUse'%20x1='94.141'%20y1='255'%20x2='94.141'%20y2='0.188'%3e%3cstop%20offset='0'%20stop-color='%23ff4c0d'/%3e%3cstop%20offset='1'%20stop-color='%23fc9502'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='fire'%3e%3cpath%20d='M187.899,164.809%20C185.803,214.868%20144.574,254.812%2094.000,254.812%20C42.085,254.812%20-0.000,211.312%20-0.000,160.812%20C-0.000,154.062%20-0.121,140.572%2010.000,117.812%20C16.057,104.191%2019.856,95.634%2022.000,87.812%20C23.178,83.513%2025.469,76.683%2032.000,87.812%20C35.851,94.374%2036.000,103.812%2036.000,103.812%20C36.000,103.812%2050.328,92.817%2060.000,71.812%20C74.179,41.019%2062.866,22.612%2059.000,9.812%20C57.662,5.384%2056.822,-2.574%2066.000,0.812%20C75.352,4.263%20100.076,21.570%20113.000,39.812%20C131.445,65.847%20138.000,90.812%20138.000,90.812%20C138.000,90.812%20143.906,83.482%20146.000,75.812%20C148.365,67.151%20148.400,58.573%20155.999,67.813%20C163.226,76.600%20173.959,93.113%20180.000,108.812%20C190.969,137.321%20187.899,164.809%20187.899,164.809%20Z'%20id='path-1'%20class='cls-3'%20fill-rule='evenodd'/%3e%3cpath%20d='M94.000,254.812%20C58.101,254.812%2029.000,225.711%2029.000,189.812%20C29.000,168.151%2037.729,155.000%2055.896,137.166%20C67.528,125.747%2078.415,111.722%2083.042,102.172%20C83.953,100.292%2086.026,90.495%2094.019,101.966%20C98.212,107.982%20104.785,118.681%20109.000,127.812%20C116.266,143.555%20118.000,158.812%20118.000,158.812%20C118.000,158.812%20125.121,154.616%20130.000,143.812%20C131.573,140.330%20134.753,127.148%20143.643,140.328%20C150.166,150.000%20159.127,167.390%20159.000,189.812%20C159.000,225.711%20129.898,254.812%2094.000,254.812%20Z'%20id='path-2'%20class='cls-4'%20fill-rule='evenodd'/%3e%3cpath%20d='M95.000,183.812%20C104.250,183.812%20104.250,200.941%20116.000,223.812%20C123.824,239.041%20112.121,254.812%2095.000,254.812%20C77.879,254.812%2069.000,240.933%2069.000,223.812%20C69.000,206.692%2085.750,183.812%2095.000,183.812%20Z'%20id='path-3'%20class='cls-5'%20fill-rule='evenodd'/%3e%3c/g%3e%3c/svg%3e";
const floodImg = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20id='Layer_1'%20data-name='Layer%201'%20xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20none;%20}%20%3c/style%3e%3c/defs%3e%3cpath%20d='M29,28a2.8828,2.8828,0,0,1-1-.1816v-.0059a3.7662,3.7662,0,0,1-2.0532-2.1338A.971.971,0,0,0,25,25a1.007,1.007,0,0,0-.9487.6836A3.4376,3.4376,0,0,1,21,28a3.44,3.44,0,0,1-3.0532-2.3213A.9894.9894,0,0,0,17,25a1.007,1.007,0,0,0-.9487.6836A3.4376,3.4376,0,0,1,13,28a3.44,3.44,0,0,1-3.0532-2.3213,1,1,0,0,0-1.8955.0049A3.4376,3.4376,0,0,1,5,28H2v2H5a4.9316,4.9316,0,0,0,4-1.9873,5.0192,5.0192,0,0,0,8,0,5.0192,5.0192,0,0,0,8,0,5.1433,5.1433,0,0,0,2.1379,1.62A4.8374,4.8374,0,0,0,29,30h1V28Z'%20transform='translate(0%200)'/%3e%3cpath%20id='_inner-path_'%20data-name='&lt;inner-path&gt;'%20class='cls-1'%20d='M23.75,11h-1.5V7h1.5ZM23,12a1,1,0,1,0,1,1A1,1,0,0,0,23,12Z'%20transform='translate(0%200)'/%3e%3cpath%20d='M29.9115,14.9355,23.6284,3.3706a.7181.7181,0,0,0-1.2568,0L16.0885,14.9355A.72.72,0,0,0,16.72,16H29.28A.72.72,0,0,0,29.9115,14.9355ZM22.25,7h1.5v4h-1.5ZM23,14a1,1,0,1,1,1-1A1,1,0,0,1,23,14Z'%20transform='translate(0%200)'/%3e%3cpath%20d='M28,21V18H26v3H25a3.4376,3.4376,0,0,1-3.0513-2.3164,1,1,0,0,0-1.8955-.0049A3.44,3.44,0,0,1,17,21a3.4376,3.4376,0,0,1-3.0513-2.3164A1.007,1.007,0,0,0,13,18a.9894.9894,0,0,0-.9468.6787A3.44,3.44,0,0,1,9,21a3.3663,3.3663,0,0,1-3-2.1855v-6.753l10-7.79,2.5327,1.9756.9682-1.7818L16.6123,2.2139a1.0094,1.0094,0,0,0-1.2427,0L1,13.4194l1.2427,1.5718L4,13.6211v5.1875a3.6892,3.6892,0,0,1-2,2.0039V22.896a4.9958,4.9958,0,0,0,3-1.8833,5.0192,5.0192,0,0,0,8,0,5.0192,5.0192,0,0,0,8,0A4.9316,4.9316,0,0,0,25,23h5V21Z'%20transform='translate(0%200)'/%3e%3crect%20id='_Transparent_Rectangle_'%20data-name='&lt;Transparent%20Rectangle&gt;'%20class='cls-1'%20width='32'%20height='32'/%3e%3c/svg%3e";
const callImg = "data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20392.533%20392.533'%20xml:space='preserve'%20fill='%23000000'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cpath%20style='fill:%23ff4040;'%20d='M281.849,132.655c2.004-1.875,4.655-2.909,7.434-2.909h66.586c8.21,0,14.869-6.659,14.869-14.869%20V36.655c0-8.21-6.659-14.869-14.869-14.869H233.946c-8.21,0-14.869,6.659-14.869,14.869v78.222c0,8.21,6.659,14.869,14.869,14.869%20c6.012,0,10.925,4.848,10.925,10.925v26.44L281.849,132.655z'/%3e%3cg%3e%3cpath%20style='fill:%23ffffff;'%20d='M323.804,64.905h-17.907V46.869c0-6.012-4.848-10.925-10.925-10.925%20c-6.012,0-10.925,4.848-10.925,10.925v18.036H266.14c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925%20h17.907v17.907c0,6.012,4.848,10.925,10.925,10.925c6.012,0,10.925-4.848,10.925-10.925V86.756h17.907%20c6.012,0,10.925-4.848,10.925-10.925C334.73,69.754,329.816,64.905,323.804,64.905z'/%3e%3cpath%20style='fill:%23ffffff;'%20d='M355.998,0H233.946c-20.234,0-36.655,16.485-36.655,36.655v78.222%20c0,16.356,10.796,30.384,25.729,34.974v42.214c0.065,9.244,11.442,14.222,18.295,7.952l52.17-48.549h62.384%20c20.234,0,36.655-16.485,36.655-36.655V36.719C392.588,16.485,376.103,0,355.998,0z%20M370.802,114.877%20c0,8.21-6.659,14.869-14.869,14.869h-66.586c-2.78,0-5.43,1.099-7.434,2.909l-37.042,34.392v-26.44%20c0-6.012-4.848-10.925-10.925-10.925c-8.21,0-14.869-6.659-14.869-14.869V36.59c0-8.21,6.659-14.869,14.869-14.869h122.053%20c8.21,0,14.869,6.659,14.869,14.869v78.287H370.802z'/%3e%3cpath%20style='fill:%23ffffff;'%20d='M247.392,253.608c-11.055-17.325-31.418-21.01-47.903-11.636l-33.487,20.299%20c-1.422,0.84-3.038,1.228-5.042,1.228c-12.154,0-33.099-14.287-49.584-41.568c-9.244-15.192-15.192-31.741-16.356-45.446%20c-0.905-10.796,1.228-18.941,5.689-21.721l33.358-20.299c16.356-9.956,21.657-31.418,11.636-47.903l-42.473-69.947%20C93.34,0.776,72.33-4.913,55.392,5.107L36.128,16.873c-53.721,32.646-46.739,138.667,15.774,241.39%20c48.937,80.291,117.98,134.206,171.96,134.271l0,0c13.123,0,24.954-3.168,35.232-9.438l19.265-11.636%20c16.873-11.378,21.463-29.996,11.636-47.903L247.392,253.608z%20M266.98,352.776l-19.265,11.636%20c-6.788,4.202-14.869,6.271-23.855,6.271l0,0c-45.899,0-108.929-50.941-153.277-123.798%20c-23.467-38.659-38.788-78.675-45.188-113.713h15.58c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925%20H22.487c-0.323-4.267-0.453-8.404-0.517-12.412h38.465c6.012,0,10.925-4.848,10.925-10.925c0-6.077-4.848-10.925-10.925-10.925%20H23.586c3.168-19.135,11.055-33.875,23.984-41.632L66.835,23.79c6.012-3.556,14.287-1.939,17.907,4.331l42.602,69.947%20c3.685,6.077,1.745,14.158-4.331,17.907l-33.358,20.299c-12.024,7.37-17.842,22.303-16.097,42.214%20c1.487,17.131,8.404,36.655,19.459,54.885c19.265,31.612,46.028,51.976,68.202,51.976c6.012,0,11.572-1.487,16.356-4.396%20l33.487-20.299c6.012-3.62,14.287-1.616,17.907,4.331l42.602,69.947C274.673,341.139,273.897,347.152,266.98,352.776z'/%3e%3c/g%3e%3cpath%20style='fill:%23000000;'%20d='M40.911,133.107h-15.58c6.4,35.103,21.721,75.119,45.188,113.713%20c44.347,72.921,107.442,123.863,153.341,123.863l0,0c9.051,0,17.067-2.069,23.855-6.271l19.265-11.636%20c6.982-5.56,7.758-11.572,4.331-17.907l-42.473-69.883c-3.62-5.947-11.895-8.016-17.907-4.331l-33.551,20.299%20c-4.784,2.909-10.343,4.396-16.356,4.396c-22.238,0-49.002-20.428-68.202-51.976c-11.119-18.23-18.036-37.689-19.459-54.885%20c-1.681-19.846,4.008-34.844,16.097-42.214l33.358-20.299c6.206-3.685,8.145-11.766,4.331-17.907L84.483,28.121%20c-3.62-6.271-11.895-7.887-17.907-4.331L47.505,35.426c-12.929,7.822-20.816,22.497-23.984,41.568H60.37%20c6.012,0,10.925,4.848,10.925,10.925c0,6.012-4.848,10.99-10.925,10.99H21.905c0,4.008,0.129,8.21,0.517,12.412h18.489%20c6.012,0,10.925,4.848,10.925,10.925C51.837,128.323,46.924,133.107,40.911,133.107z'/%3e%3c/g%3e%3c/svg%3e";
const nonviolenceImg = "" + new URL("nonviolence-CJxTFcZ2.svg", import.meta.url).href;
const userssolid = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20640%20512'%20height='200px'%20width='200px'%3e%3c!--!Font%20Awesome%20Free%206.7.2%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202025%20Fonticons,%20Inc.--%3e%3cpath%20d='M38.8%205.1C28.4-3.1%2013.3-1.2%205.1%209.2S-1.2%2034.7%209.2%2042.9l592%20464c10.4%208.2%2025.5%206.3%2033.7-4.1s6.3-25.5-4.1-33.7L440.6%20320l178.1%200c11.8%200%2021.3-9.6%2021.3-21.3C640%20239.8%20592.2%20192%20533.3%20192l-42.7%200c-15.9%200-31%203.5-44.6%209.7c1.3%207.2%201.9%2014.7%201.9%2022.3c0%2030.2-10.5%2058-28%2079.9l-25.2-19.7C408.1%20267.7%20416%20246.8%20416%20224c0-53-43-96-96-96c-31.1%200-58.7%2014.8-76.3%2037.7l-40.6-31.8c13-14.2%2020.9-33.1%2020.9-53.9c0-44.2-35.8-80-80-80C116.3%200%2091.9%2014.1%2077.5%2035.5L38.8%205.1zM106.7%20192C47.8%20192%200%20239.8%200%20298.7C0%20310.4%209.6%20320%2021.3%20320l213.3%200c.2%200%20.4%200%20.7%200c-20.6-18.2-35.2-42.8-40.8-70.8L121.8%20192l-15.2%200zM261.3%20352C187.7%20352%20128%20411.7%20128%20485.3c0%2014.7%2011.9%2026.7%2026.7%2026.7l330.7%200c10.5%200%2019.5-6%2023.9-14.8L324.9%20352l-63.6%200zM512%20160A80%2080%200%201%200%20512%200a80%2080%200%201%200%200%20160z'/%3e%3c/svg%3e";
const usersolid = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='200px'%20width='200px'%20viewBox='0%200%20640%20512'%3e%3c!--!Font%20Awesome%20Free%206.7.2%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202025%20Fonticons,%20Inc.--%3e%3cpath%20d='M38.8%205.1C28.4-3.1%2013.3-1.2%205.1%209.2S-1.2%2034.7%209.2%2042.9l592%20464c10.4%208.2%2025.5%206.3%2033.7-4.1s6.3-25.5-4.1-33.7L353.3%20251.6C407.9%20237%20448%20187.2%20448%20128C448%2057.3%20390.7%200%20320%200C250.2%200%20193.5%2055.8%20192%20125.2L38.8%205.1zM264.3%20304.3C170.5%20309.4%2096%20387.2%2096%20482.3c0%2016.4%2013.3%2029.7%2029.7%2029.7l388.6%200c3.9%200%207.6-.7%2011-2.1l-261-205.6z'/%3e%3c/svg%3e";
let BackgroundRunner;
const initializeBackgroundRunner = async () => {
  if (Capacitor.isNativePlatform()) {
    const { BackgroundRunner: BR } = await __vitePreload(async () => {
      const { BackgroundRunner: BR2 } = await import("./index-CTWF5qpt.js");
      return { BackgroundRunner: BR2 };
    }, true ? __vite__mapDeps([3,1,2]) : void 0, import.meta.url);
    BackgroundRunner = BR;
  } else {
    BackgroundRunner = {
      addListener: () => ({ remove: () => {
      } }),
      removeAllListeners: () => {
      },
      dispatchEvent: () => Promise.resolve(),
      isAvailable: () => Promise.resolve({ available: false })
    };
  }
};
initializeBackgroundRunner();
const VOLUME_PRESS_INTERVAL = 500;
const PRESS_COUNT_THRESHOLD = 4;
let pressCount = 0;
let lastPressTime = 0;
let isRegistered = false;
const handleVolumePress = async () => {
  const now = Date.now();
  if (now - lastPressTime > VOLUME_PRESS_INTERVAL) {
    pressCount = 0;
  }
  pressCount++;
  lastPressTime = now;
  if (pressCount >= PRESS_COUNT_THRESHOLD) {
    pressCount = 0;
    return true;
  }
  return false;
};
const registerVolumeButtonListener = async () => {
  if (isRegistered) return;
  try {
    if (!BackgroundRunner) {
      await initializeBackgroundRunner();
    }
    const isAvailable = await BackgroundRunner.isAvailable();
    if (!isAvailable.available) {
      console.error("Background runner not available:", isAvailable.reason);
      return;
    }
    BackgroundRunner.addListener("volumeButtonPressed", async () => {
      if (await handleVolumePress()) {
        if (typeof window.triggerRobberyAlert === "function") {
          window.triggerRobberyAlert();
        }
      }
    });
    console.log("Volume button listener registered");
    isRegistered = true;
  } catch (error) {
    console.error("Background task registration failed:", error);
  }
};
const unregisterVolumeButtonListener = async () => {
  if (!isRegistered) return;
  try {
    await BackgroundRunner.removeAllListeners();
    isRegistered = false;
  } catch (error) {
    console.error("Background task unregistration failed:", error);
  }
};
registerVolumeButtonListener();
App.addListener("appStateChange", ({ isActive }) => {
  if (isActive) {
    registerVolumeButtonListener();
  } else {
    unregisterVolumeButtonListener();
  }
});
const _hoisted_1 = { class: "m-5 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3" };
const Message = "All approved contacts on your emergency list would receive this message.";
const noContactsMessage = "You do not have any contacts in your emergency list. To use this service, register at least one person, and they must approve your request before receiving alerts.";
const noApprovedMessage = "None of your contacts have approved your request. Alert them to approve your request.";
const _sfc_main = {
  __name: "HomePage",
  setup(__props) {
    const { App: App2 } = isNativePlatform();
    const TriggerAlert = useOperations();
    const $q = useQuasar();
    const dialogOpen = ref(false);
    const selectedCard = ref(null);
    const notRegisteredImg = usersolid;
    const noContactsImg = userssolid;
    const robberyCountdownRef = ref(null);
    const robberyCard = {
      id: 2,
      cardTitle: "Robbery",
      cardTitle2: "Attack",
      cardImg: handcuffsImg
    };
    window.triggerRobberyAlert = () => {
      if (robberyCountdownRef.value) {
        robberyCountdownRef.value.start();
      }
    };
    onMounted(() => {
      App2.addListener("appStateChange", (state) => {
        if (state.isActive) {
          if (robberyCountdownRef.value) {
            registerVolumeButtonListener();
          }
        } else {
          if (robberyCountdownRef.value) {
            robberyCountdownRef.value.cancel();
          }
        }
      });
    });
    onBeforeUnmount(() => {
      unregisterVolumeButtonListener();
      delete window.triggerRobberyAlert;
    });
    const contacts = computed(() => TriggerAlert.myContacts || []);
    const approveCont = computed(
      () => contacts.value.filter((contact) => contact.status === "approved").length
    );
    const CardName1 = computed(() => {
      if (contacts.value.length === 0) return "No";
      if (approveCont.value === 0) return "No";
      return selectedCard.value?.cardTitle || "";
    });
    const CardName2 = computed(() => {
      if (contacts.value.length === 0) return " Contacts";
      if (approveCont.value === 0) return " Approved Contacts";
      return selectedCard.value?.cardTitle2 || "";
    });
    const CardImage = computed(() => {
      if (contacts.value.length === 0) return notRegisteredImg;
      if (approveCont.value === 0) return noContactsImg;
      return selectedCard.value?.cardImg || "";
    });
    const triggerMessage = computed(() => {
      if (contacts.value.length === 0) return noContactsMessage;
      if (approveCont.value === 0) return noApprovedMessage;
      return Message;
    });
    const triggerButtons = computed(() => {
      if (contacts.value.length === 0)
        return [
          { label: "Register Contacts", route: "/pages/edit" },
          { label: "Cancel", action: onClose }
        ];
      if (approveCont.value === 0)
        return [
          { label: "Contact List", route: "/pages/list" },
          { label: "Cancel", action: onClose }
        ];
      return [{ label: "Trigger Alert", action: TriggerAction }, { label: "Cancel", action: onClose }];
    });
    const openTrigger = (item) => {
      selectedCard.value = item;
      dialogOpen.value = true;
    };
    const cardInfo = [
      {
        id: 1,
        cardTitle: "Health",
        cardTitle2: "Crisis",
        cardImg: healthImg
      },
      {
        id: 2,
        cardTitle: "Robbery",
        cardTitle2: "Attack",
        cardImg: handcuffsImg
      },
      {
        id: 3,
        cardTitle: "Fire",
        cardTitle2: "Outbreak",
        cardImg: fireImg
      },
      {
        id: 4,
        cardTitle: "Flood",
        cardTitle2: "Alert",
        cardImg: floodImg
      },
      {
        id: 5,
        cardTitle: "Call",
        cardTitle2: "Emergency",
        cardImg: callImg
      },
      {
        id: 6,
        cardTitle: "Violence",
        cardTitle2: "Alert",
        cardImg: nonviolenceImg
      }
    ];
    const onClose = () => {
      dialogOpen.value = false;
    };
    const triggerRobberyAlert = async () => {
      selectedCard.value = robberyCard;
      if (contacts.value.length > 0 && approveCont.value > 0) {
        const geolocation = await getGeolocation();
        if (!geolocation.latitude || !geolocation.longitude) {
          $q.notify({
            message: "Location not available. Please turn on your device location",
            type: "negative",
            icon: "location_off",
            position: "bottom",
            timeout: 3e3
          });
          return;
        }
        try {
          await TriggerAlert.alertTrigger({
            alertType: robberyCard.cardTitle,
            location: geolocation
          });
          $q.notify({
            message: "Robbery alert sent to your emergency contacts!",
            type: "positive",
            icon: "check_circle",
            position: "bottom",
            timeout: 3e3
          });
        } catch (error) {
          $q.notify({
            message: "Failed to send robbery alert: " + error.message,
            type: "negative",
            icon: "error",
            position: "bottom",
            timeout: 3e3
          });
        }
      } else {
        $q.notify({
          message: "Cannot send alert: No approved contacts available",
          type: "negative",
          icon: "error",
          position: "bottom",
          timeout: 3e3
        });
      }
    };
    const cancelRobberyAlert = () => {
      $q.notify({
        message: "Robbery alert canceled",
        type: "info",
        icon: "cancel",
        position: "bottom",
        timeout: 2e3
      });
    };
    const TriggerAction = async () => {
      if (contacts.value.length > 0 && approveCont.value > 0) {
        const geolocation = await getGeolocation();
        if (!geolocation.latitude || !geolocation.longitude) {
          console.error("Geolocation not available");
          $q.notify({
            message: "Location not available. Please turn on your device location",
            type: "negative",
            icon: "location_off",
            position: "bottom",
            timeout: 3e3
          });
          return;
        } else {
          await TriggerAlert.alertTrigger({
            alertType: selectedCard.value?.cardTitle,
            location: geolocation
          });
          onClose();
        }
      } else {
        $q.notify({
          message: "Error triggering alert: No approved contacts or user not authenticated",
          type: "negative",
          icon: "error",
          position: "bottom",
          timeout: 3e3
        });
      }
    };
    const getGeolocation = async () => {
      if (isNativePlatform()) {
        return getNativeGeolocation();
      } else {
        return getWebGeolocation();
      }
    };
    const getNativeGeolocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 6e4
        }, $q.notify({
          message: "Mobile location triggered",
          type: "negative",
          icon: "location_off",
          position: "bottom",
          timeout: 3e3
        }));
        return {
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
          accuracy: coordinates.coords.accuracy
        };
      } catch (error) {
        $q.notify({
          message: error.message || "User denied the request for Geolocation.",
          type: "negative",
          icon: "location_off",
          position: "bottom",
          timeout: 3e3
        });
      }
    };
    const getWebGeolocation = () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject("Geolocation is not supported by your browser");
        } else {
          navigator.geolocation.getCurrentPosition(
            () => {
              const watchId = navigator.geolocation.watchPosition(
                (position) => {
                  resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                  });
                  navigator.geolocation.clearWatch(watchId);
                },
                (error) => handleGeolocationError(error, reject),
                { enableHighAccuracy: true, timeout: 6e4, maximumAge: 0 }
              );
            },
            (error) => handleGeolocationError(error, reject),
            { enableHighAccuracy: true, timeout: 6e4 }
          );
        }
      });
    };
    const handleGeolocationError = (error, reject) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          $q.notify({
            message: "User denied the request for Geolocation.",
            type: "negative",
            icon: "location_off",
            position: "bottom",
            timeout: 3e3
          });
          break;
        case error.POSITION_UNAVAILABLE:
          $q.notify({
            message: "Location information is unavailable.",
            type: "negative",
            icon: "location_off",
            position: "bottom",
            timeout: 3e3
          });
          break;
        case error.TIMEOUT:
          $q.notify({
            message: "The request to get user location timed out.",
            type: "negative",
            icon: "location_off",
            position: "bottom",
            timeout: 3e3
          });
          break;
        case error.UNKNOWN_ERROR:
          $q.notify({
            message: "An unknown error occurred.",
            type: "negative",
            icon: "location_off",
            position: "bottom",
            timeout: 3e3
          });
          break;
      }
      reject(error);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "relative flex-1 flex-grow flex flex-col min-w-0 break-words w-full" }, {
        default: withCtx(() => [
          createVNode(RobberyCountdown, {
            ref_key: "robberyCountdownRef",
            ref: robberyCountdownRef,
            onComplete: triggerRobberyAlert,
            onCancel: cancelRobberyAlert
          }, null, 512),
          createBaseVNode("div", _hoisted_1, [
            (openBlock(), createElementBlock(Fragment, null, renderList(cardInfo, (item, key) => {
              return createBaseVNode("div", { key }, [
                createVNode(_sfc_main$1, {
                  "card-title": item.cardTitle,
                  "card-title2": item.cardTitle2,
                  "card-img": item.cardImg,
                  onClick: ($event) => openTrigger(item)
                }, null, 8, ["card-title", "card-title2", "card-img", "onClick"])
              ]);
            }), 64)),
            selectedCard.value ? (openBlock(), createBlock(_sfc_main$3, {
              key: 0,
              modelValue: dialogOpen.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogOpen.value = $event),
              "card-name1": CardName1.value,
              "card-name2": CardName2.value,
              "card-image": CardImage.value,
              message: triggerMessage.value,
              buttons: triggerButtons.value
            }, null, 8, ["modelValue", "card-name1", "card-name2", "card-image", "message", "buttons"])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
