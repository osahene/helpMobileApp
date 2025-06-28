import { Q as QCard, a as QCardSection } from "./QCard-7XTvnQPP.js";
import { t as reactive, r as ref, k as resolveComponent, l as createBlock, m as openBlock, n as withCtx, f as createVNode, A as createBaseVNode, u as unref, M as createTextVNode, Q as QIcon, E as QBtn, a1 as normalizeStyle, G as withModifiers } from "./index-Bs10UzzQ.js";
import { Q as QSeparator } from "./QSeparator-C1pDE3mk.js";
import { Q as QInput } from "./QInput-C0L2HJsB.js";
import { Q as QPage } from "./QPage-DCmqepVD.js";
import { u as useAuthStore } from "./auth-0N9PlROk.js";
import { u as useVuelidate, r as required, e as email } from "./index-CvuUrq8s.js";
import { u as useQuasar } from "./use-quasar-CD5xJ-Qg.js";
import { o as oe } from "./index.es-B4ABB4FF.js";
import "./uid-CiaxOpXt.js";
import "./focus-manager-B-vefqia.js";
import "./axiosInstance-9n5X4jXu.js";
import "./axios-DsnWYMmf.js";
const _hoisted_1 = { class: "text-grey-8 text-weight-light text-h6" };
const _sfc_main = {
  __name: "RegisterPage",
  setup(__props) {
    const $q = useQuasar();
    const RegAuth = useAuthStore();
    const user = reactive({
      first_name: "",
      last_name: "",
      email_address: "",
      password: ""
    });
    const isPwd = ref(true);
    const wrongPass = ref(false);
    const rules = {
      user: {
        first_name: { required },
        last_name: { required },
        email_address: { required, email },
        password: { required }
      }
    };
    const $v = useVuelidate(rules, { user });
    const validPassword = () => {
      const pwd = user.password;
      return pwd.length >= 5 && /[A-Z]/.test(pwd);
    };
    const onSubmit = async () => {
      $v.value.$touch();
      if ($v.value.$pending || $v.value.$invalid) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Please correct the errors in the form"
        });
        return false;
      }
      localStorage.clear();
      if (validPassword()) {
        localStorage.setItem("email_address", user.email_address.toLowerCase());
        const formData = new FormData();
        formData.append("first_name", user.first_name);
        formData.append("last_name", user.last_name);
        formData.append("email", user.email_address);
        formData.append("password", user.password);
        await RegAuth.register(formData);
      } else {
        wrongPass.value = true;
      }
    };
    const handleGoogleLoginSuccess = async (response) => {
      const { credential } = response;
      await RegAuth.socialLogin({ credential });
    };
    const handleGoogleLoginError = (errorResponse) => {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: errorResponse.message || "Login not successful"
      });
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
        default: withCtx(() => [
          createVNode(QCard, {
            class: "q-pa-md shadow-10 backdrop-blur my_card",
            rounded: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center text-h5" }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createBaseVNode("div", { class: "text-grey-9 text-weight-light" }, "Register with", -1)
                ])),
                _: 1,
                __: [5]
              }),
              createVNode(QCardSection, { class: "flex justify-around" }, {
                default: withCtx(() => [
                  createVNode(unref(oe), {
                    onSuccess: handleGoogleLoginSuccess,
                    onError: handleGoogleLoginError,
                    class: "text-subtitle1 q-ma-none shadow-2 text-weight-light",
                    style: { "color": "teal" }
                  }, {
                    default: withCtx(() => [
                      createVNode(QIcon, {
                        name: "fa-brands fa-google",
                        class: "q-mr-sm"
                      }),
                      _cache[6] || (_cache[6] = createTextVNode(" Google "))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(QSeparator, {
                class: "q-ma-md",
                inset: ""
              }),
              createVNode(QCardSection, { class: "q-pa-sm text-center" }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createBaseVNode("div", { class: "text-grey-8 text-weight-light text-h6 q-ma-none" }, " or register with custom credentials ", -1)
                ])),
                _: 1,
                __: [7]
              }),
              createVNode(QCardSection, { class: "q-gutter-xs" }, {
                default: withCtx(() => [
                  _cache[8] || (_cache[8] = createBaseVNode("h6", { class: "q-ma-none text-weight-light" }, "First Name", -1)),
                  createVNode(QInput, {
                    class: "custom-input",
                    placeholder: "Ama",
                    filled: "",
                    modelValue: unref($v).user.first_name.$model,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref($v).user.first_name.$model = $event),
                    modelModifiers: { trim: true },
                    type: "text",
                    error: !unref($v).user.first_name.required && unref($v).user.first_name.$dirty,
                    "error-message": "First name is required"
                  }, {
                    before: withCtx(() => [
                      createVNode(QIcon, { name: "fa-regular fa-user" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "error"]),
                  _cache[9] || (_cache[9] = createBaseVNode("h6", { class: "q-ma-none q-mt-md text-weight-light" }, "Last Name", -1)),
                  createVNode(QInput, {
                    class: "custom-input",
                    placeholder: "Henewaa",
                    filled: "",
                    modelValue: unref($v).user.last_name.$model,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref($v).user.last_name.$model = $event),
                    modelModifiers: { trim: true },
                    type: "text",
                    error: !unref($v).user.last_name.required && unref($v).user.last_name.$dirty,
                    "error-message": "Last name is required"
                  }, {
                    before: withCtx(() => [
                      createVNode(QIcon, { name: "fa-regular fa-user" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "error"]),
                  _cache[10] || (_cache[10] = createBaseVNode("h6", { class: "q-ma-none q-mt-md text-weight-light" }, "Email Address", -1)),
                  createVNode(QInput, {
                    class: "custom-input",
                    placeholder: "amahenewaa@example.com",
                    filled: "",
                    modelValue: unref($v).user.email_address.$model,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref($v).user.email_address.$model = $event),
                    modelModifiers: { trim: true },
                    type: "email",
                    error: !unref($v).user.email_address.required && unref($v).user.email_address.$dirty || !unref($v).user.email_address.email && unref($v).user.email_address.$dirty,
                    "error-message": "A valid email is required"
                  }, {
                    before: withCtx(() => [
                      createVNode(QIcon, { name: "fa-regular fa-envelope" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "error"]),
                  _cache[11] || (_cache[11] = createBaseVNode("h6", { class: "q-ma-none q-mt-md text-weight-light" }, "Password", -1)),
                  createVNode(QInput, {
                    class: "custom-input",
                    placeholder: "********",
                    filled: "",
                    modelValue: unref($v).user.password.$model,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref($v).user.password.$model = $event),
                    modelModifiers: { trim: true },
                    type: isPwd.value ? "password" : "text",
                    error: !unref($v).user.password.required && unref($v).user.password.$dirty || !validPassword() && unref($v).user.password.$dirty,
                    "error-message": "Password is invalid"
                  }, {
                    before: withCtx(() => [
                      createVNode(QIcon, { name: "fa-solid fa-key" })
                    ]),
                    append: withCtx(() => [
                      createVNode(QIcon, {
                        name: isPwd.value ? "visibility_off" : "visibility",
                        class: "cursor-pointer",
                        onClick: _cache[3] || (_cache[3] = ($event) => isPwd.value = !isPwd.value)
                      }, null, 8, ["name"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "type", "error"])
                ]),
                _: 1,
                __: [8, 9, 10, 11]
              }),
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    onClick: withModifiers(onSubmit, ["prevent"]),
                    class: "text-subtitle1 q-px-xl q-ma-none shadow-2 text-weight-light",
                    style: normalizeStyle({ backgroundColor: unref($v).$anyDirty && !unref($v).$invalid ? "#b7d1ed" : "#d3d3d3" }),
                    icon: "fa-solid fa-file-signature",
                    label: "Register",
                    disable: !unref($v).$anyDirty || unref($v).$invalid
                  }, null, 8, ["style", "disable"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, { class: "text-center q-pt-none" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    _cache[13] || (_cache[13] = createTextVNode(" Already have an account? ")),
                    createVNode(_component_router_link, { to: "/auth/login" }, {
                      default: withCtx(() => _cache[12] || (_cache[12] = [
                        createBaseVNode("span", { class: "text-blue-500" }, "Sign In", -1)
                      ])),
                      _: 1,
                      __: [12]
                    })
                  ])
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
