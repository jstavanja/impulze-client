<script setup lang="ts">
import { Impulze } from '../types/Impulze'
import ImpulzeComponent from './Impulze.vue'

const { impulzes } = defineProps<{
  impulzes: Impulze[] | undefined
}>()
</script>

<template>
  <ul>
    <li v-for="impulze in impulzes">
      <ImpulzeComponent :impulze="impulze" />
    </li>
  </ul>
</template>
