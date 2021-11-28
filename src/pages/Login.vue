<script setup lang="ts">
import axios from 'axios'
import LoginForm from '../components/LoginForm.vue'
import API_ROUTES from '../constants/api-routes'
import AuthLayout from '../layouts/Auth.vue'
import { router } from '../routes'
import { setLocalStorageItem } from '../utils/local-storage'
import Link from '../components/atoms/Link.vue'

interface LoginResponse {
  token: string
}

const login = async (email: string, password: string) => {
  try {
    const loginResponse = await axios.post<LoginResponse>(
      API_ROUTES.USER.LOGIN,
      {
        email,
        password,
      }
    )
    setLocalStorageItem('impulze_token', loginResponse.data.token)
    router.push('/')
  } catch (err) {
    // TODO: add toast
    alert('Login failed')
  }
}
</script>

<template>
  <AuthLayout>
    <h2 class="login-page__title">Log in to ⚡️ Impulze</h2>
    <LoginForm :login-function="login" />
    <Link to="/register" class="login-page__register-link">
      Don't have an account yet? Register here.
    </Link>
  </AuthLayout>
</template>

<style lang="scss">
@import '../styles/variables';
.login-page__title {
  font-size: $font-size-3xl;
  margin-bottom: $spacing-4;
}

.login-page__register-link {
  display: block;
  margin-top: $spacing-4;
}
</style>
