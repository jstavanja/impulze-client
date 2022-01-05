<script setup lang="ts">
import Link from '../components/atoms/Link.vue'
</script>

<template>
  <main class="not-found">
    <div class="not-found__content">
      <h1 class="not-found__title">🙈 Page not found.</h1>
      <Link to="/">Go back to the homepage!</Link>
    </div>
  </main>
</template>

<style lang="scss">
@import '../styles/_variables.scss';

.not-found {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

h1.not-found__title {
  font-size: $font-size-xl;
  margin-bottom: $spacing-2;
}
</style>
