<script setup lang="ts">
const startAllImpulzes = () => {
  console.log('starting all impulzes')
}

const stopAllImpulzes = () => {
  console.log('stopping all impulzes')
}
</script>

<template>
  <div class="actions">
    <button type="button" @click="startAllImpulzes">
      Start all impulzes
    </button>
    <button type="button" @click="stopAllImpulzes">
      Stop all impulzes
    </button>
  </div>
</template>
