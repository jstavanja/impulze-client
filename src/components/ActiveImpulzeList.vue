<script setup lang="ts">
import { defineProps } from 'vue'
import { Impulze } from '../types/Impulze'

const props = defineProps<{
  activeImpulzes: Impulze[] | undefined
}>()
</script>

<template>
  <div>
    Currently active impulzes
    <ul>
      <li
        v-for="activeImpulze in props.activeImpulzes"
        :key="activeImpulze.description"
      >
        <span>
          {{ activeImpulze.name }}
        </span>
      </li>
    </ul>
  </div>
</template>
