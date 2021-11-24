<script setup lang="ts">
import { ref } from 'vue'
import Field from '../components/atoms/Field.vue'
import Button from '../components/atoms/Button.vue'

const props = defineProps<{
  loginFunction:(email: string, password: string) => void
}>()

const email = ref('')
const password = ref('')

const callLoginFunction = () => {
  props.loginFunction(email.value, password.value)
}
</script>

<template>
  <form class="login-form">
    <Field
      label="E-mail"
      name="email"
      placeholder="john.doe@impulze.io"
      class="login-form__email-field"
      v-model="email"
    />
    <Field
      label="Password"
      name="password"
      input-type="password"
      placeholder="••••••••••••••"
      class="login-form__password-field"
      v-model="password"
    />
    <Button @click="callLoginFunction">Log in</Button>
  </form>
</template>
