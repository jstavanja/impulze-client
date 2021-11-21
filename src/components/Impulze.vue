<script setup lang="ts">
import { Impulze } from '../types/Impulze'
const { impulze } = defineProps<{
  impulze: Impulze
}>()
</script>

<template>
  <article>
    <h3>{{ impulze.name }}</h3>
    <p>{{ impulze.description }}</p>
    <div>
      <span>Period: {{ impulze.period / 1000 }} s</span>
    </div>
    <div>
      <button type="button">Activate</button>
      <button type="button">Remove</button>
    </div>
  </article>
</template>
