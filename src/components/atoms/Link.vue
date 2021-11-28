<script setup lang="ts">
const props = defineProps<{
  to: string
}>()
</script>

<template>
  <router-link :to="props.to">
    <slot />
  </router-link>
</template>

<style lang="scss">
.login-page__register-link {
  color: black;
}
</style>
