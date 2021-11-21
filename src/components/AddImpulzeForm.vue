<script setup lang="ts">
import { ref } from 'vue'
import { Impulze } from '../types/Impulze'
import Button from './atoms/Button.vue'
import Field from './atoms/Field.vue'

const emit = defineEmits(['submit'])

const name = ref<string>('')
const description = ref<string>('')
const period = ref<number>()

const submitSubmitEvent = () => {
  const newImpulze: Impulze = {
    name: name.value,
    description: description.value,
    period: period.value || 0,
  }
  emit('submit', newImpulze)
}
</script>

<template>
  <form @submit.prevent>
    <Field
      name="name"
      label="Name"
      placeholder="My cool impulze"
      v-model="name"
    />
    <Field
      name="description"
      label="Description"
      placeholder="This impulze is meant to notify me about ..."
      v-model="description"
    />
    <Field name="period" label="Period" placeholder="60" v-model="period" />

    <Button @click="submitSubmitEvent">Add</Button>
  </form>
</template>

<style lang="scss"></style>
