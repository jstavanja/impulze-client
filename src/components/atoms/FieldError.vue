<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    errorMessage?: string
  }>(),
  {
    errorMessage: undefined,
  }
)
</script>

<template>
  <span class="field__error">{{ props.errorMessage }}</span>
</template>

<style lang="scss" scoped>
@import '../../styles/variables';
.field__error {
  margin-top: $spacing-2;
  color: $red-600;
}
</style>
