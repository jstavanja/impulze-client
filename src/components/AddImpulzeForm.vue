<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'
import { string } from 'yup'
import { Impulze } from '../types/Impulze'
import { convertSecondsToMilliseconds } from '../utils/time'
import Button from './atoms/Button.vue'
import Field from './atoms/Field.vue'

const props = defineProps<{
  addImpulzeFunction:(impulze: Impulze) => void
}>()

const {
  value: name,
  errorMessage: nameErrorMessage,
  meta: nameMeta,
} = useField<string>('name', string().required('This field is required'))

const {
  value: description,
  errorMessage: descriptionErrorMessage,
  meta: descriptionMeta,
} = useField<string>('description', string().required('This field is required'))

const {
  value: period,
  errorMessage: periodErrorMessage,
  meta: periodMeta,
} = useField<number>(
  'period',
  string()
    .required('This field is required')
    .matches(/^\d*$/, 'Input must be an integer number')
)

const formInvalid = computed(
  () =>
    !!nameErrorMessage.value ||
    !!descriptionErrorMessage.value ||
    !!periodErrorMessage.value ||
    !nameMeta.dirty ||
    !descriptionMeta.dirty ||
    !periodMeta.dirty
)

const callAddImpulzeFunction = () => {
  if (formInvalid.value) return

  if (typeof period.value !== 'number') {
    period.value = parseInt(period.value)
  }

  const newImpulze: Impulze = {
    name: name.value,
    description: description.value,
    period: convertSecondsToMilliseconds(period.value),
  }

  props.addImpulzeFunction(newImpulze)
}
</script>

<template>
  <form @submit.prevent class="add-impulze-form">
    <Field
      class="add-impulze-form__name-field"
      name="name"
      label="Name"
      placeholder="My cool impulze"
      v-model="name"
      :error-message="nameErrorMessage"
    />
    <Field
      class="add-impulze-form__description-field"
      name="description"
      label="Description"
      placeholder="This impulze is meant to notify me about ..."
      v-model="description"
      :error-message="descriptionErrorMessage"
    />
    <Field
      class="add-impulze-form__period-field"
      name="period"
      label="Period"
      placeholder="60"
      v-model="period"
      input-type="number"
      :error-message="periodErrorMessage"
    />

    <Button
      @click="callAddImpulzeFunction"
      custom-class="add-impulze-form__add-button"
      :disabled="formInvalid"
    >
      Add
    </Button>
  </form>
</template>

<style lang="scss">
@import '../styles/variables';

.add-impulze-form__name-field {
  margin-top: $spacing-4;
}
</style>
