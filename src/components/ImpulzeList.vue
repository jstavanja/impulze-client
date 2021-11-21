<script setup lang="ts">
import { Impulze } from '../types/Impulze'
import ImpulzeComponent from './Impulze.vue'

const { impulzes } = defineProps<{
  impulzes: Impulze[] | undefined
}>()
</script>

<template>
  <ul class="impulze-list">
    <li v-for="impulze in impulzes">
      <ImpulzeComponent :impulze="impulze" />
    </li>
  </ul>
</template>

<style lang="scss">
@import '../styles/variables';
.impulze-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2;
  margin: $spacing-2;
}
</style>
