<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
import AuthLayout from '../layouts/Auth.vue'

const login = (email: string, password: string) => {
  console.log(email, password)
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
