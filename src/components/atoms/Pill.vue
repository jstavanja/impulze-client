<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'alert' | 'success' | 'warning'
  size?: 'small' | 'normal'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'normal',
})

const isPrimary = computed(() => props.variant === 'primary')
const isSecondary = computed(() => props.variant === 'secondary')
const isAlert = computed(() => props.variant === 'alert')
const isSuccess = computed(() => props.variant === 'success')
const isWarning = computed(() => props.variant === 'warning')

const isSmall = computed(() => props.size === 'small')
</script>

<template>
  <span
    class="pill"
    :class="{
      'pill--primary': isPrimary,
      'pill--secondary': isSecondary,
      'pill--alert': isAlert,
      'pill--success': isSuccess,
      'pill--warning': isWarning,

      'pill--small': isSmall,
    }"
  >
    <slot />
  </span>
</template>

<style lang="scss">
@import '../../styles/variables';

.pill {
  border-radius: $border-radius;
  padding: 10px 20px;
}

.pill--primary {
  background-color: $primary-500;
  color: $white;
}

.pill--secondary {
  background-color: $gray-50;
}
</style>
