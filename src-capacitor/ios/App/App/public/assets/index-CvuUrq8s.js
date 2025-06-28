import { g as getCurrentInstance, r as ref, a6 as onBeforeMount, w as watch, i as isRef, t as reactive, R as onBeforeUnmount, c as computed, u as unref, a as inject, aT as provide, b0 as isReactive, b1 as isReadonly, a4 as nextTick } from "./index-Bs10UzzQ.js";
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function unwrapObj(obj) {
  let ignoreKeys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return Object.keys(obj).reduce((o, k) => {
    if (ignoreKeys.includes(k)) return o;
    o[k] = unref(obj[k]);
    return o;
  }, {});
}
function isFunction$1(val) {
  return typeof val === "function";
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function get(obj, stringPath, def) {
  let current = obj;
  const path = stringPath.split(".");
  for (let i = 0; i < path.length; i++) {
    if (!current[path[i]]) return def;
    current = current[path[i]];
  }
  return current;
}
function gatherBooleanGroupProperties(group, nestedResults, property) {
  return computed(() => {
    return group.some((path) => {
      return get(nestedResults, path, {
        [property]: false
      })[property];
    });
  });
}
function gatherArrayGroupProperties(group, nestedResults, property) {
  return computed(() => {
    return group.reduce((all, path) => {
      const fetchedProperty = get(nestedResults, path, {
        [property]: false
      })[property] || [];
      return all.concat(fetchedProperty);
    }, []);
  });
}
function callRule(rule, value, siblingState, instance) {
  return rule.call(instance, unref(value), unref(siblingState), instance);
}
function normalizeValidatorResponse(result) {
  return result.$valid !== void 0 ? !result.$valid : !result;
}
function createAsyncResult(rule, model, $pending, $dirty, _ref, $response, instance) {
  let {
    $lazy,
    $rewardEarly
  } = _ref;
  let watchTargets = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : [];
  let siblingState = arguments.length > 8 ? arguments[8] : void 0;
  let $lastInvalidState = arguments.length > 9 ? arguments[9] : void 0;
  let $lastCommittedOn = arguments.length > 10 ? arguments[10] : void 0;
  const $invalid = ref(!!$dirty.value);
  const $pendingCounter = ref(0);
  $pending.value = false;
  const $unwatch = watch([model, $dirty].concat(watchTargets, $lastCommittedOn), () => {
    if ($lazy && !$dirty.value || $rewardEarly && !$lastInvalidState.value && !$pending.value) {
      return;
    }
    let ruleResult;
    try {
      ruleResult = callRule(rule, model, siblingState, instance);
    } catch (err) {
      ruleResult = Promise.reject(err);
    }
    $pendingCounter.value++;
    $pending.value = !!$pendingCounter.value;
    $invalid.value = false;
    Promise.resolve(ruleResult).then((data) => {
      $pendingCounter.value--;
      $pending.value = !!$pendingCounter.value;
      $response.value = data;
      $invalid.value = normalizeValidatorResponse(data);
    }).catch((error) => {
      $pendingCounter.value--;
      $pending.value = !!$pendingCounter.value;
      $response.value = error;
      $invalid.value = true;
    });
  }, {
    immediate: true,
    deep: typeof model === "object"
  });
  return {
    $invalid,
    $unwatch
  };
}
function createSyncResult(rule, model, $dirty, _ref2, $response, instance, siblingState, $lastInvalidState) {
  let {
    $lazy,
    $rewardEarly
  } = _ref2;
  const $unwatch = () => ({});
  const $invalid = computed(() => {
    if ($lazy && !$dirty.value || $rewardEarly && !$lastInvalidState.value) {
      return false;
    }
    let returnValue = true;
    try {
      const result = callRule(rule, model, siblingState, instance);
      $response.value = result;
      returnValue = normalizeValidatorResponse(result);
    } catch (err) {
      $response.value = err;
    }
    return returnValue;
  });
  return {
    $unwatch,
    $invalid
  };
}
function createValidatorResult(rule, model, $dirty, config, instance, validatorName, propertyKey, propertyPath, siblingState, $lastInvalidState, $lastCommittedOn) {
  const $pending = ref(false);
  const $params = rule.$params || {};
  const $response = ref(null);
  let $invalid;
  let $unwatch;
  if (rule.$async) {
    ({
      $invalid,
      $unwatch
    } = createAsyncResult(rule.$validator, model, $pending, $dirty, config, $response, instance, rule.$watchTargets, siblingState, $lastInvalidState, $lastCommittedOn));
  } else {
    ({
      $invalid,
      $unwatch
    } = createSyncResult(rule.$validator, model, $dirty, config, $response, instance, siblingState, $lastInvalidState));
  }
  const message = rule.$message;
  const $message = isFunction$1(message) ? computed(() => message(unwrapObj({
    $pending,
    $invalid,
    $params: unwrapObj($params),
    $model: model,
    $response,
    $validator: validatorName,
    $propertyPath: propertyPath,
    $property: propertyKey
  }))) : message || "";
  return {
    $message,
    $params,
    $pending,
    $invalid,
    $response,
    $unwatch
  };
}
function sortValidations() {
  let validationsRaw = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const validations = unref(validationsRaw);
  const validationKeys = Object.keys(validations);
  const rules = {};
  const nestedValidators = {};
  const config = {};
  let validationGroups = null;
  validationKeys.forEach((key) => {
    const v = validations[key];
    switch (true) {
      case isFunction$1(v.$validator):
        rules[key] = v;
        break;
      case isFunction$1(v):
        rules[key] = {
          $validator: v
        };
        break;
      case key === "$validationGroups":
        validationGroups = v;
        break;
      case key.startsWith("$"):
        config[key] = v;
        break;
      default:
        nestedValidators[key] = v;
    }
  });
  return {
    rules,
    nestedValidators,
    config,
    validationGroups
  };
}
const ROOT_PATH = "__root";
function createValidationResults(rules, model, key, resultsCache, path, config, instance, externalResults, siblingState) {
  const ruleKeys = Object.keys(rules);
  const cachedResult = resultsCache.get(path, rules);
  const $dirty = ref(false);
  const $lastInvalidState = ref(false);
  const $lastCommittedOn = ref(0);
  if (cachedResult) {
    if (!cachedResult.$partial) return cachedResult;
    cachedResult.$unwatch();
    $dirty.value = cachedResult.$dirty.value;
  }
  const result = {
    $dirty,
    $path: path,
    $touch: () => {
      if (!$dirty.value) $dirty.value = true;
    },
    $reset: () => {
      if ($dirty.value) $dirty.value = false;
    },
    $commit: () => {
    }
  };
  if (!ruleKeys.length) {
    cachedResult && resultsCache.set(path, rules, result);
    return result;
  }
  ruleKeys.forEach((ruleKey) => {
    result[ruleKey] = createValidatorResult(rules[ruleKey], model, result.$dirty, config, instance, ruleKey, key, path, siblingState, $lastInvalidState, $lastCommittedOn);
  });
  result.$externalResults = computed(() => {
    if (!externalResults.value) return [];
    return [].concat(externalResults.value).map((stringError, index) => ({
      $propertyPath: path,
      $property: key,
      $validator: "$externalResults",
      $uid: `${path}-externalResult-${index}`,
      $message: stringError,
      $params: {},
      $response: null,
      $pending: false
    }));
  });
  result.$invalid = computed(() => {
    const r = ruleKeys.some((ruleKey) => unref(result[ruleKey].$invalid));
    $lastInvalidState.value = r;
    return !!result.$externalResults.value.length || r;
  });
  result.$pending = computed(() => ruleKeys.some((ruleKey) => unref(result[ruleKey].$pending)));
  result.$error = computed(() => result.$dirty.value ? result.$pending.value || result.$invalid.value : false);
  result.$silentErrors = computed(() => ruleKeys.filter((ruleKey) => unref(result[ruleKey].$invalid)).map((ruleKey) => {
    const res = result[ruleKey];
    return reactive({
      $propertyPath: path,
      $property: key,
      $validator: ruleKey,
      $uid: `${path}-${ruleKey}`,
      $message: res.$message,
      $params: res.$params,
      $response: res.$response,
      $pending: res.$pending
    });
  }).concat(result.$externalResults.value));
  result.$errors = computed(() => result.$dirty.value ? result.$silentErrors.value : []);
  result.$unwatch = () => ruleKeys.forEach((ruleKey) => {
    result[ruleKey].$unwatch();
  });
  result.$commit = () => {
    $lastInvalidState.value = true;
    $lastCommittedOn.value = Date.now();
  };
  resultsCache.set(path, rules, result);
  return result;
}
function collectNestedValidationResults(validations, nestedState, path, resultsCache, config, instance, nestedExternalResults) {
  const nestedValidationKeys = Object.keys(validations);
  if (!nestedValidationKeys.length) return {};
  return nestedValidationKeys.reduce((results, nestedKey) => {
    results[nestedKey] = setValidations({
      validations: validations[nestedKey],
      state: nestedState,
      key: nestedKey,
      parentKey: path,
      resultsCache,
      globalConfig: config,
      instance,
      externalResults: nestedExternalResults
    });
    return results;
  }, {});
}
function createMetaFields(results, nestedResults, childResults) {
  const allResults = computed(() => [nestedResults, childResults].filter((res) => res).reduce((allRes, res) => {
    return allRes.concat(Object.values(unref(res)));
  }, []));
  const $dirty = computed({
    get() {
      return results.$dirty.value || (allResults.value.length ? allResults.value.every((r) => r.$dirty) : false);
    },
    set(v) {
      results.$dirty.value = v;
    }
  });
  const $silentErrors = computed(() => {
    const modelErrors = unref(results.$silentErrors) || [];
    const nestedErrors = allResults.value.filter((result) => (unref(result).$silentErrors || []).length).reduce((errors, result) => {
      return errors.concat(...result.$silentErrors);
    }, []);
    return modelErrors.concat(nestedErrors);
  });
  const $errors = computed(() => {
    const modelErrors = unref(results.$errors) || [];
    const nestedErrors = allResults.value.filter((result) => (unref(result).$errors || []).length).reduce((errors, result) => {
      return errors.concat(...result.$errors);
    }, []);
    return modelErrors.concat(nestedErrors);
  });
  const $invalid = computed(() => allResults.value.some((r) => r.$invalid) || unref(results.$invalid) || false);
  const $pending = computed(() => allResults.value.some((r) => unref(r.$pending)) || unref(results.$pending) || false);
  const $anyDirty = computed(() => allResults.value.some((r) => r.$dirty) || allResults.value.some((r) => r.$anyDirty) || $dirty.value);
  const $error = computed(() => $dirty.value ? $pending.value || $invalid.value : false);
  const $touch = () => {
    results.$touch();
    allResults.value.forEach((result) => {
      result.$touch();
    });
  };
  const $commit = () => {
    results.$commit();
    allResults.value.forEach((result) => {
      result.$commit();
    });
  };
  const $reset = () => {
    results.$reset();
    allResults.value.forEach((result) => {
      result.$reset();
    });
  };
  if (allResults.value.length && allResults.value.every((nr) => nr.$dirty)) $touch();
  return {
    $dirty,
    $errors,
    $invalid,
    $anyDirty,
    $error,
    $pending,
    $touch,
    $reset,
    $silentErrors,
    $commit
  };
}
function setValidations(_ref) {
  let {
    validations,
    state,
    key,
    parentKey,
    childResults,
    resultsCache,
    globalConfig = {},
    instance,
    externalResults
  } = _ref;
  const path = parentKey ? `${parentKey}.${key}` : key;
  const {
    rules,
    nestedValidators,
    config,
    validationGroups
  } = sortValidations(validations);
  const mergedConfig = _objectSpread2$1(_objectSpread2$1({}, globalConfig), config);
  const nestedState = key ? computed(() => {
    const s = unref(state);
    return s ? unref(s[key]) : void 0;
  }) : state;
  const cachedExternalResults = _objectSpread2$1({}, unref(externalResults) || {});
  const nestedExternalResults = computed(() => {
    const results2 = unref(externalResults);
    if (!key) return results2;
    return results2 ? unref(results2[key]) : void 0;
  });
  const results = createValidationResults(rules, nestedState, key, resultsCache, path, mergedConfig, instance, nestedExternalResults, state);
  const nestedResults = collectNestedValidationResults(nestedValidators, nestedState, path, resultsCache, mergedConfig, instance, nestedExternalResults);
  const $validationGroups = {};
  if (validationGroups) {
    Object.entries(validationGroups).forEach((_ref2) => {
      let [key2, group] = _ref2;
      $validationGroups[key2] = {
        $invalid: gatherBooleanGroupProperties(group, nestedResults, "$invalid"),
        $error: gatherBooleanGroupProperties(group, nestedResults, "$error"),
        $pending: gatherBooleanGroupProperties(group, nestedResults, "$pending"),
        $errors: gatherArrayGroupProperties(group, nestedResults, "$errors"),
        $silentErrors: gatherArrayGroupProperties(group, nestedResults, "$silentErrors")
      };
    });
  }
  const {
    $dirty,
    $errors,
    $invalid,
    $anyDirty,
    $error,
    $pending,
    $touch,
    $reset,
    $silentErrors,
    $commit
  } = createMetaFields(results, nestedResults, childResults);
  const $model = key ? computed({
    get: () => unref(nestedState),
    set: (val) => {
      $dirty.value = true;
      const s = unref(state);
      const external = unref(externalResults);
      if (external) {
        external[key] = cachedExternalResults[key];
      }
      if (isRef(s[key])) {
        s[key].value = val;
      } else {
        s[key] = val;
      }
    }
  }) : null;
  if (key && mergedConfig.$autoDirty) {
    watch(nestedState, () => {
      if (!$dirty.value) $touch();
      const external = unref(externalResults);
      if (external) {
        external[key] = cachedExternalResults[key];
      }
    }, {
      flush: "sync"
    });
  }
  async function $validate() {
    $touch();
    if (mergedConfig.$rewardEarly) {
      $commit();
      await nextTick();
    }
    await nextTick();
    return new Promise((resolve) => {
      if (!$pending.value) return resolve(!$invalid.value);
      const unwatch = watch($pending, () => {
        resolve(!$invalid.value);
        unwatch();
      });
    });
  }
  function $getResultsForChild(key2) {
    return (childResults.value || {})[key2];
  }
  function $clearExternalResults() {
    if (isRef(externalResults)) {
      externalResults.value = cachedExternalResults;
    } else {
      if (Object.keys(cachedExternalResults).length === 0) {
        Object.keys(externalResults).forEach((k) => {
          delete externalResults[k];
        });
      } else {
        Object.assign(externalResults, cachedExternalResults);
      }
    }
  }
  return reactive(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, results), {}, {
    $model,
    $dirty,
    $error,
    $errors,
    $invalid,
    $anyDirty,
    $pending,
    $touch,
    $reset,
    $path: path || ROOT_PATH,
    $silentErrors,
    $validate,
    $commit
  }, childResults && {
    $getResultsForChild,
    $clearExternalResults,
    $validationGroups
  }), nestedResults));
}
class ResultsStorage {
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  set(path, rules, result) {
    this.storage.set(path, {
      rules,
      result
    });
  }
  checkRulesValidity(path, rules, storedRules) {
    const storedRulesKeys = Object.keys(storedRules);
    const newRulesKeys = Object.keys(rules);
    if (newRulesKeys.length !== storedRulesKeys.length) return false;
    const hasAllValidators = newRulesKeys.every((ruleKey) => storedRulesKeys.includes(ruleKey));
    if (!hasAllValidators) return false;
    return newRulesKeys.every((ruleKey) => {
      if (!rules[ruleKey].$params) return true;
      return Object.keys(rules[ruleKey].$params).every((paramKey) => {
        return unref(storedRules[ruleKey].$params[paramKey]) === unref(rules[ruleKey].$params[paramKey]);
      });
    });
  }
  get(path, rules) {
    const storedRuleResultPair = this.storage.get(path);
    if (!storedRuleResultPair) return void 0;
    const {
      rules: storedRules,
      result
    } = storedRuleResultPair;
    const isValidCache = this.checkRulesValidity(path, rules, storedRules);
    const $unwatch = result.$unwatch ? result.$unwatch : () => ({});
    if (!isValidCache) return {
      $dirty: result.$dirty,
      $partial: true,
      $unwatch
    };
    return result;
  }
}
const CollectFlag = {
  COLLECT_ALL: true,
  COLLECT_NONE: false
};
const VuelidateInjectChildResults = Symbol("vuelidate#injectChildResults");
const VuelidateRemoveChildResults = Symbol("vuelidate#removeChildResults");
function nestedValidations(_ref) {
  let {
    $scope,
    instance
  } = _ref;
  const childResultsRaw = {};
  const childResultsKeys = ref([]);
  const childResults = computed(() => childResultsKeys.value.reduce((results, key) => {
    results[key] = unref(childResultsRaw[key]);
    return results;
  }, {}));
  function injectChildResultsIntoParent(results, _ref2) {
    let {
      $registerAs: key,
      $scope: childScope,
      $stopPropagation
    } = _ref2;
    if ($stopPropagation || $scope === CollectFlag.COLLECT_NONE || childScope === CollectFlag.COLLECT_NONE || $scope !== CollectFlag.COLLECT_ALL && $scope !== childScope) return;
    childResultsRaw[key] = results;
    childResultsKeys.value.push(key);
  }
  instance.__vuelidateInjectInstances = [].concat(instance.__vuelidateInjectInstances || [], injectChildResultsIntoParent);
  function removeChildResultsFromParent(key) {
    childResultsKeys.value = childResultsKeys.value.filter((childKey) => childKey !== key);
    delete childResultsRaw[key];
  }
  instance.__vuelidateRemoveInstances = [].concat(instance.__vuelidateRemoveInstances || [], removeChildResultsFromParent);
  const sendValidationResultsToParent = inject(VuelidateInjectChildResults, []);
  provide(VuelidateInjectChildResults, instance.__vuelidateInjectInstances);
  const removeValidationResultsFromParent = inject(VuelidateRemoveChildResults, []);
  provide(VuelidateRemoveChildResults, instance.__vuelidateRemoveInstances);
  return {
    childResults,
    sendValidationResultsToParent,
    removeValidationResultsFromParent
  };
}
function ComputedProxyFactory(target) {
  return new Proxy(target, {
    get(target2, prop) {
      return typeof target2[prop] === "object" ? ComputedProxyFactory(target2[prop]) : computed(() => target2[prop]);
    }
  });
}
let uid = 0;
function useVuelidate(validations, state) {
  var _getCurrentInstance;
  let globalConfig = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (arguments.length === 1) {
    globalConfig = validations;
    validations = void 0;
    state = void 0;
  }
  let {
    $registerAs,
    $scope = CollectFlag.COLLECT_ALL,
    $stopPropagation,
    $externalResults,
    currentVueInstance
  } = globalConfig;
  const instance = currentVueInstance || ((_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy);
  const componentOptions = instance ? instance.$options : {};
  if (!$registerAs) {
    uid += 1;
    $registerAs = `_vuelidate_${uid}`;
  }
  const validationResults = ref({});
  const resultsCache = new ResultsStorage();
  const {
    childResults,
    sendValidationResultsToParent,
    removeValidationResultsFromParent
  } = instance ? nestedValidations({
    $scope,
    instance
  }) : {
    childResults: ref({})
  };
  if (!validations && componentOptions.validations) {
    const rules = componentOptions.validations;
    state = ref({});
    onBeforeMount(() => {
      state.value = instance;
      watch(() => isFunction$1(rules) ? rules.call(state.value, new ComputedProxyFactory(state.value)) : rules, (validations2) => {
        validationResults.value = setValidations({
          validations: validations2,
          state,
          childResults,
          resultsCache,
          globalConfig,
          instance,
          externalResults: $externalResults || instance.vuelidateExternalResults
        });
      }, {
        immediate: true
      });
    });
    globalConfig = componentOptions.validationsConfig || globalConfig;
  } else {
    const validationsWatchTarget = isRef(validations) || isProxy(validations) ? validations : reactive(validations || {});
    watch(validationsWatchTarget, (newValidationRules) => {
      validationResults.value = setValidations({
        validations: newValidationRules,
        state,
        childResults,
        resultsCache,
        globalConfig,
        instance: instance !== null && instance !== void 0 ? instance : {},
        externalResults: $externalResults
      });
    }, {
      immediate: true
    });
  }
  if (instance) {
    sendValidationResultsToParent.forEach((f) => f(validationResults, {
      $registerAs,
      $scope,
      $stopPropagation
    }));
    onBeforeUnmount(() => removeValidationResultsFromParent.forEach((f) => f($registerAs)));
  }
  return computed(() => {
    return _objectSpread2$1(_objectSpread2$1({}, unref(validationResults.value)), childResults.value);
  });
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function isFunction(val) {
  return typeof val === "function";
}
function isObject(o) {
  return o !== null && typeof o === "object" && !Array.isArray(o);
}
function normalizeValidatorObject(validator) {
  return isFunction(validator.$validator) ? _objectSpread2({}, validator) : {
    $validator: validator
  };
}
function unwrapValidatorResponse(result) {
  if (typeof result === "object") return result.$valid;
  return result;
}
function unwrapNormalizedValidator(validator) {
  return validator.$validator || validator;
}
function withParams($params, $validator) {
  if (!isObject($params)) throw new Error(`[@vuelidate/validators]: First parameter to "withParams" should be an object, provided ${typeof $params}`);
  if (!isObject($validator) && !isFunction($validator)) throw new Error(`[@vuelidate/validators]: Validator must be a function or object with $validator parameter`);
  const validatorObj = normalizeValidatorObject($validator);
  validatorObj.$params = _objectSpread2(_objectSpread2({}, validatorObj.$params || {}), $params);
  return validatorObj;
}
function withMessage($message, $validator) {
  if (!isFunction($message) && typeof unref($message) !== "string") throw new Error(`[@vuelidate/validators]: First parameter to "withMessage" should be string or a function returning a string, provided ${typeof $message}`);
  if (!isObject($validator) && !isFunction($validator)) throw new Error(`[@vuelidate/validators]: Validator must be a function or object with $validator parameter`);
  const validatorObj = normalizeValidatorObject($validator);
  validatorObj.$message = $message;
  return validatorObj;
}
function withAsync($validator) {
  let $watchTargets = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  const validatorObj = normalizeValidatorObject($validator);
  return _objectSpread2(_objectSpread2({}, validatorObj), {}, {
    $async: true,
    $watchTargets
  });
}
function forEach(validators) {
  return {
    $validator(collection) {
      for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
      }
      return unref(collection).reduce((previous, collectionItem, index) => {
        const collectionEntryResult = Object.entries(collectionItem).reduce((all, _ref) => {
          let [property, $model] = _ref;
          const innerValidators = validators[property] || {};
          const propertyResult = Object.entries(innerValidators).reduce((all2, _ref2) => {
            let [validatorName, currentValidator] = _ref2;
            const validatorFunction = unwrapNormalizedValidator(currentValidator);
            const $response = validatorFunction.call(this, $model, collectionItem, index, ...others);
            const $valid = unwrapValidatorResponse($response);
            all2.$data[validatorName] = $response;
            all2.$data.$invalid = !$valid || !!all2.$data.$invalid;
            all2.$data.$error = all2.$data.$invalid;
            if (!$valid) {
              let $message = currentValidator.$message || "";
              const $params = currentValidator.$params || {};
              if (typeof $message === "function") {
                $message = $message({
                  $pending: false,
                  $invalid: !$valid,
                  $params,
                  $model,
                  $response
                });
              }
              all2.$errors.push({
                $property: property,
                $message,
                $params,
                $response,
                $model,
                $pending: false,
                $validator: validatorName
              });
            }
            return {
              $valid: all2.$valid && $valid,
              $data: all2.$data,
              $errors: all2.$errors
            };
          }, {
            $valid: true,
            $data: {},
            $errors: []
          });
          all.$data[property] = propertyResult.$data;
          all.$errors[property] = propertyResult.$errors;
          return {
            $valid: all.$valid && propertyResult.$valid,
            $data: all.$data,
            $errors: all.$errors
          };
        }, {
          $valid: true,
          $data: {},
          $errors: {}
        });
        return {
          $valid: previous.$valid && collectionEntryResult.$valid,
          $data: previous.$data.concat(collectionEntryResult.$data),
          $errors: previous.$errors.concat(collectionEntryResult.$errors)
        };
      }, {
        $valid: true,
        $data: [],
        $errors: []
      });
    },
    $message: (_ref3) => {
      let {
        $response
      } = _ref3;
      return $response ? $response.$errors.map((context) => {
        return Object.values(context).map((errors) => errors.map((error) => error.$message)).reduce((a, b) => a.concat(b), []);
      }) : [];
    }
  };
}
const req = (value) => {
  value = unref(value);
  if (Array.isArray(value)) return !!value.length;
  if (value === void 0 || value === null) {
    return false;
  }
  if (value === false) {
    return true;
  }
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === "object") {
    for (let _ in value) return true;
    return false;
  }
  return !!String(value).length;
};
const len = (value) => {
  value = unref(value);
  if (Array.isArray(value)) return value.length;
  if (typeof value === "object") {
    return Object.keys(value).length;
  }
  return String(value).length;
};
function regex() {
  for (var _len = arguments.length, expr = new Array(_len), _key = 0; _key < _len; _key++) {
    expr[_key] = arguments[_key];
  }
  return (value) => {
    value = unref(value);
    return !req(value) || expr.every((reg) => {
      reg.lastIndex = 0;
      return reg.test(value);
    });
  };
}
var common = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  forEach,
  len,
  normalizeValidatorObject,
  regex,
  req,
  unwrap: unref,
  unwrapNormalizedValidator,
  unwrapValidatorResponse,
  withAsync,
  withMessage,
  withParams
});
regex(/^[a-zA-Z]*$/);
regex(/^[a-zA-Z0-9]*$/);
regex(/^\d*(\.\d+)?$/);
const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
var email$1 = regex(emailRegex);
var email = {
  $validator: email$1,
  $message: "Value is not a valid email address",
  $params: {
    type: "email"
  }
};
function required$1(value) {
  if (typeof value === "string") {
    value = value.trim();
  }
  return req(value);
}
var required = {
  $validator: required$1,
  $message: "Value is required",
  $params: {
    type: "required"
  }
};
function sameAs$1(equalTo) {
  return (value) => unref(value) === unref(equalTo);
}
function sameAs(equalTo) {
  let otherName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "other";
  return {
    $validator: sameAs$1(equalTo),
    $message: (_ref) => {
      return `The value must be equal to the ${otherName} value`;
    },
    $params: {
      equalTo,
      otherName,
      type: "sameAs"
    }
  };
}
const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
regex(urlRegex);
regex(/(^[0-9]*$)|(^-[0-9]+$)/);
regex(/^[-]?\d*(\.\d+)?$/);
export {
  common as c,
  email as e,
  required as r,
  sameAs as s,
  useVuelidate as u
};
