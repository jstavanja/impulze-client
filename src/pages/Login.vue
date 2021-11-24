<script setup lang="ts">
import axios from 'axios'
import LoginForm from '../components/LoginForm.vue'
import API_ROUTES from '../constants/api-routes'
import AuthLayout from '../layouts/Auth.vue'
import { router } from '../routes'
import { setLocalStorageItem } from '../utils/local-storage'

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
  </AuthLayout>
</template>

<style lang="scss">
@import '../styles/variables';
.login-page__title {
  font-size: $font-size-3xl;
  margin-bottom: $spacing-4;
}
</style>
