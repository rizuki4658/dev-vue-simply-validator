<template>
  <form @submit.prevent="validating">
    <label>Name</label>
    <input type="text" name="name" v-model="state.name"  />
    <p v-if="validation.name.$errors.length">
      <span v-for="(error, n) in validation.name.$errors" :key="n">
        {{ error }}
      </span>
    </p>
    <template v-else>
      <br />
      <br />
    </template>
    <label>Email</label>
    <input type="email" name="email" v-model="state.email"  />
    <p v-if="validation.email.$errors.length">
      <span v-for="(error, n) in validation.email.$errors" :key="n" style="display: block;">
        {{ error }}
      </span>
    </p>
    <template v-else>
      <br />
      <br />
    </template>
    <button type="submit">Submit</button>
    <button @click="resetForm" type="reset">Reset</button>
  </form>
</template>

<script>
import SimplyValidate from '../src/utils'
import { Example as Rules } from '../src/rules'
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      name: null,
      email: null
    })

    const validation = SimplyValidate(Rules, state)

    const validating = () => {
      validation.$touch()
    }

    const resetForm = () => {
      validation.$reset()
    }

    return {
      state,
      validation,
      validating,
      resetForm
    }
  }
}
</script>
