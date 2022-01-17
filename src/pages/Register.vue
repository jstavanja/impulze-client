<script setup lang="ts">
import axios from 'axios'
import RegistrationForm from '../components/RegistrationForm.vue'
import API_ROUTES from '../constants/api-routes'
import AuthLayout from '../layouts/Auth.vue'
import { router } from '../routes'
import Link from '../components/atoms/Link.vue'

interface RegisterResponse {
  token: string
}

const register = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
) => {
  try {
    await axios.post<RegisterResponse>(API_ROUTES.USER.REGISTER, {
      email,
      username,
      password,
      passwordConf: confirmPassword,
    })

    router.push('/login')
  } catch (err) {
    // TODO: add toast
    alert('Registration failed')
  }
}
</script>

<template>
  <AuthLayout>
    <h2 class="register-page__title">Create an account on ⚡️ Pulses</h2>
    <RegistrationForm :register-function="register" />
    <Link to="/login" class="register-page__register-link">
      Already have an account? Log in here.
    </Link>
  </AuthLayout>
</template>

<style lang="scss">
@import '../styles/variables';
.register-page__title {
  font-size: $font-size-3xl;
  margin-bottom: $spacing-4;
}

.register-page__register-link {
  display: block;
  margin-top: $spacing-4;
}
</style>
