<script setup lang="ts">
import { useField } from 'vee-validate'
import Field from './atoms/Field.vue'
import Button from './atoms/Button.vue'
import { string } from 'yup'
import { computed } from 'vue-demi'

const props = defineProps<{
  registerFunction:(
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => void
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
  value: username,
  errorMessage: usernameErrorMessage,
  meta: usernameMeta,
} = useField<string>('username', string().required('This field is required'))

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField<string>('password', string().required('This field is required'))

const {
  value: confirmPassword,
  errorMessage: confirmPasswordErrorMessage,
  meta: confirmPasswordMeta,
} = useField<string>(
  'confirmPassword',
  string()
    .required('This field is required')
    .test('equal', 'Passwords do not match', function (v) {
      return v === password.value
    })
)

const formInvalid = computed(
  () =>
    !!emailErrorMessage.value ||
    !!usernameErrorMessage.value ||
    !!passwordErrorMessage.value ||
    !!confirmPasswordErrorMessage.value ||
    !emailMeta.dirty ||
    !usernameMeta.dirty ||
    !passwordMeta.dirty ||
    !confirmPasswordMeta.dirty
)

const callRegisterFunction = () => {
  if (formInvalid.value) return

  props.registerFunction(
    email.value,
    username.value,
    password.value,
    confirmPassword.value
  )
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
      label="Username"
      name="username"
      placeholder="johndoe"
      class="login-form__username-field"
      v-model="username"
      :error-message="usernameErrorMessage"
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
    <Field
      label="Confirm password"
      name="confirmPassword"
      input-type="password"
      placeholder="••••••••••••••"
      class="login-form__confirm-password-field"
      v-model="confirmPassword"
      :error-message="confirmPasswordErrorMessage"
    />
    <Button @click="callRegisterFunction" :disabled="formInvalid">
      Register
    </Button>
  </form>
</template>
