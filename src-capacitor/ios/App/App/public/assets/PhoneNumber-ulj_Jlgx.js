import { Q as QCard, a as QCardSection } from "./QCard-7XTvnQPP.js";
import { r as ref, l as createBlock, m as openBlock, n as withCtx, f as createVNode, A as createBaseVNode, u as unref, Q as QIcon, E as QBtn, G as withModifiers, a1 as normalizeStyle } from "./index-Bs10UzzQ.js";
import { Q as QInput } from "./QInput-C0L2HJsB.js";
import { Q as QPage } from "./QPage-DCmqepVD.js";
import { u as useAuthStore } from "./auth-0N9PlROk.js";
import { c as common, u as useVuelidate, r as required } from "./index-CvuUrq8s.js";
import { u as useQuasar } from "./use-quasar-CD5xJ-Qg.js";
import "./uid-CiaxOpXt.js";
import "./focus-manager-B-vefqia.js";
import "./axiosInstance-9n5X4jXu.js";
import "./axios-DsnWYMmf.js";
const _sfc_main = {
  __name: "PhoneNumber",
  setup(__props) {
    const PhoneAuth = useAuthStore();
    const $q = useQuasar();
    const phoneRegex = /^[+][0-9]{1,15}$/;
    const phone_number = ref("");
    const rules = {
      phone_number: {
        required,
        validFormat: common.withMessage(
          "Enter a valid phone number",
          (value) => phoneRegex.test(value)
        )
      }
    };
    const $v = useVuelidate(rules, { phone_number });
    const onSubmit = async () => {
      $v.value.$touch();
      if ($v.value.$invalid) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Please correct the errors in the form"
        });
        return;
      }
      localStorage.setItem("phone_number", phone_number.value);
      const formData = new FormData();
      formData.append("phone_number", phone_number.value);
      await PhoneAuth.VerifyPhone(formData);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
        default: withCtx(() => [
          createVNode(QCard, {
            class: "q-pa-md q-px-lg shadow-10 backdrop-blur my_card",
            rounded: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center text-h5" }, {
                default: withCtx(() => _cache[1] || (_cache[1] = [
                  createBaseVNode("div", { class: "text-grey-9 text-weight-light" }, "Phone Number", -1)
                ])),
                _: 1,
                __: [1]
              }),
              createVNode(QCardSection, { class: "q-gutter-xs" }, {
                default: withCtx(() => [
                  _cache[2] || (_cache[2] = createBaseVNode("h6", { class: "q-ma-none q-mt-md text-weight-light" }, "Phone Number", -1)),
                  createVNode(QInput, {
                    class: "custom-input",
                    filled: "",
                    modelValue: unref($v).phone_number.$model,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref($v).phone_number.$model = $event),
                    modelModifiers: { trim: true },
                    placeholder: "+233241123456",
                    type: "tel"
                  }, {
                    before: withCtx(() => [
                      createVNode(QIcon, { name: "fa-solid fa-phone" })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1,
                __: [2]
              }),
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    flat: "",
                    class: "text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light",
                    style: normalizeStyle({ backgroundColor: unref($v).$anyDirty && !unref($v).$invalid ? "#b7d1ed" : "#d3d3d3" }),
                    disable: !unref($v).$anyDirty || unref($v).$invalid,
                    icon: "fa-regular fa-paper-plane",
                    label: "Submit",
                    onClick: withModifiers(onSubmit, ["prevent"])
                  }, null, 8, ["style", "disable"])
                ]),
                _: 1
              })
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
