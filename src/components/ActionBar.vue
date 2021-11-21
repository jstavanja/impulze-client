<script setup lang="ts">
import Button from './atoms/Button.vue'

const startAllImpulzes = () => {
  console.log('starting all impulzes')
}

const stopAllImpulzes = () => {
  console.log('stopping all impulzes')
}
</script>

<template>
  <div class="actions">
    <Button variant="primary" @click="startAllImpulzes">
      Start all impulzes
    </Button>
    <Button variant="secondary" @click="stopAllImpulzes">
      Stop all impulzes
    </Button>
  </div>
</template>

<style lang="scss">
@import '../styles/variables';

.actions {
  display: flex;
  gap: $spacing-2;
  margin-bottom: $spacing-8;
}
</style>
