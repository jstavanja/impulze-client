<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'alert' | 'success' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const isPrimary = computed(() => props.variant === 'primary')
const isSecondary = computed(() => props.variant === 'secondary')
const isAlert = computed(() => props.variant === 'alert')
const isSuccess = computed(() => props.variant === 'success')
const isWarning = computed(() => props.variant === 'warning')

const emit = defineEmits(['click'])

const emitClick = () => {
  emit('click')
}
</script>

<template>
  <button
    type="button"
    class="button"
    :class="{
      'button--primary': isPrimary,
      'button--secondary': isSecondary,
      'button--alert': isAlert,
      'button--success': isSuccess,
      'button--warning': isWarning,
    }"
    @click="emitClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '../../styles/variables';
.button {
  padding: 10px 20px;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  color: $white;
  font-size: $font-size-md;
  font-weight: bold;
  transform: scale(1);
  transition: 0.1s all ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.button--primary {
  background-color: $primary-500;
}

.button--alert {
  background-color: $red-500;
}
</style>
