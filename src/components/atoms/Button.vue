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

      'button--small': isSmall,
    }"
    @click="emitClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '../../styles/variables';
.button {
  padding: var(--button-padding, 10px 20px);
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  color: $white;
  font-size: $font-size-md;
  font-weight: bold;
  transform: scale(1);
  transition: 0.1s all ease-in-out;
  max-height: 100%;

  &:hover {
    transform: scale(1.05);
  }
}

.button--primary {
  background-color: $primary-500;
}

.button--secondary {
  color: $black;
}

.button--alert {
  background-color: $red-500;
}

.button--small {
  max-height: 25px;
  --button-padding: 5px 10px;
  font-size: $font-size-sm;
}
</style>
