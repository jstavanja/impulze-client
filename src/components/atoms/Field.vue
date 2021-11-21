<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label: string
    name: string
    placeholder?: string
    inputType?: 'text' | 'tel'
  }>(),
  {
    modelValue: undefined,
    inputType: 'text',
    placeholder: '',
  }
)

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="field">
    <label :for="props.name">{{ props.label }}</label>
    <input
      :type="props.inputType"
      :placeholder="props.placeholder"
      :name="props.name"
      :id="props.name"
      v-model="inputValue"
    />
  </div>
</template>
