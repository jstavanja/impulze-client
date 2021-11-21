<script setup lang="ts">
import { Impulze } from '../types/Impulze'

const { activeImpulzes } = defineProps<{
  activeImpulzes: Impulze[] | undefined
}>()
</script>

<template>
  <div>
    Currently active impulzes
    <ul>
      <li v-for="activeImpulze in activeImpulzes">
        <span>
          {{ activeImpulze.name }}
        </span>
      </li>
    </ul>
  </div>
</template>
