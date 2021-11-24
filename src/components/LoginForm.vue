<script setup lang="ts">
import { useField } from 'vee-validate'
import Field from '../components/atoms/Field.vue'
import Button from '../components/atoms/Button.vue'
import { string } from 'yup'
import { computed } from 'vue-demi'

const props = defineProps<{
  loginFunction:(email: string, password: string) => void
}>()

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta,
} = useField<string>(
  'email',
  string()
    .email('You must enter a valid email')
    .required('This field is required')
)

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField<string>('password', string().required('This field is required'))

const formInvalid = computed(
  () =>
    !!emailErrorMessage.value ||
    !!passwordErrorMessage.value ||
    !emailMeta.dirty ||
    !passwordMeta.dirty
)

const callLoginFunction = () => {
  if (formInvalid.value) return

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
      :error-message="emailErrorMessage"
    />
    <Field
      label="Password"
      name="password"
      input-type="password"
      placeholder="••••••••••••••"
      class="login-form__password-field"
      v-model="password"
      :error-message="passwordErrorMessage"
    />
    <Button @click="callLoginFunction" :disabled="formInvalid">Log in</Button>
  </form>
</template>
