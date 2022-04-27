import { computed, getCurrentInstance, isVue3, ref, unref, inject, provide, isReactive, isReadonly, watch, isRef, reactive, nextTick } from 'vue-demi'

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

function setValidationsParent({validations, state}) {
  const $dirty = ref(false)
  const nestedValidations = ref({})
  const rulesKey = Object.keys(validations)
  rulesKey.forEach(key => {
    const nested = Object.keys(validations[key])
    nested.forEach(item => {
      const child = setValidationsChild(validations[key][item], state[key], key, item)
      nestedValidations.value = {...nestedValidations.value, ...child}
    })  
  })

  const $errors = ref([])

  const $error = computed(() => $errors.value.length ? true : false)

  const $invalid = computed(() => $errors.value.length ? true : false)

  function $validate() {
    const nestedKeys = Object.keys(nestedValidations.value)
    const results = []
    nestedKeys.forEach(key => {
      const invalid = nestedValidations.value[key].$validate(state[key])
      if (invalid) {
        JSON.parse(JSON.stringify(nestedValidations.value[key].$errors)).map(x => {
          results.push(x)
        })
      }
    })
    $errors.value = results
    if (results.length) {
      return true
    }
    return false
  }

  function $touch() {
    if (!$dirty.value) $dirty.value = true
    $validate()
  }
  function $reset() {
    if ($dirty.value) $dirty.value = false
    $errors.value = []
  }

  return Object.assign({}, {
    $dirty,
    $error,
    $errors,
    $invalid,
    $validate,
    $touch,
    $reset
  })
}

function setValidationsChild(validations, state, key, item) {
  const $dirty = ref(false)
  const $errors = ref([])
  const $error = computed(() => $dirty.value ? true : false)
  const $invalid = computed(() => $dirty.value ? true : false)
  function $validate(value = state) {
    $errors.value = []
    const invalid = validations.$validator(value)
    if (invalid) {
      $dirty.value = true
      $errors.value.push({
        $message: validations.$message ? validations.$message : 'Value is required',
        $path: key,
        $params: {
          type: item
        }
      })
    }
    return invalid
  }
  function $touch() {
    if (!$dirty.value) $dirty.value = true
    $validate()
  }
  function $reset() {
    if ($dirty.value) $dirty.value = false
    $errors.value = []
  }

  return {
    [key]: {
      $dirty,
      $error,
      $errors,
      $invalid,
      $validate,
      $path: key,
      $validator: item,
      $touch,
      $reset
    }
  }
}

function simplyValidate(validations, state) {
  const validationResults = ref({})
  const stateResults = isRef(state) || isProxy(state) ? state : reactive(state || {})
  const validationsWatchTarget = isRef(validations) || isProxy(validations) ? validations : reactive(validations || {})

  watch(validationsWatchTarget, newValidationRules => {
    validationResults.value = setValidationsParent({
      validations: newValidationRules,
      state: stateResults
    })
  },{
    immediate: true,
    deep: true
  })
  return computed(() => {
    return Object.assign({}, unref(validationResults.value));
  })
}
export default simplyValidate