<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { number, string } from 'yup'
import { Impulze } from '../types/Impulze'
import { convertSplitUnitsToMilliseconds } from '../utils/time'
import Button from './atoms/Button.vue'
import Field from './atoms/Field.vue'
import FieldError from './atoms/FieldError.vue'

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

const hours = ref('')
const minutes = ref('')
const seconds = ref('')

const {
  value: period,
  errorMessage: periodErrorMessage,
  meta: periodMeta,
} = useField<number>(
  'period',
  number()
    .required('A period is required')
    .moreThan(0, 'The period has to be bigger than 0 seconds')
)

const periodInMilliseconds = computed(() => {
  return convertSplitUnitsToMilliseconds(parseInt(hours.value || '0'), parseInt(minutes.value || '0'), parseInt(seconds.value || '0'))
})

watch(periodInMilliseconds, (value) => {
  period.value = value
})

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
    period: period.value,
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
    <div class="add-impulze-form__period-section">
      <div class="add-impulze-form__period-label">Period:</div>
      <fieldset class="add-impulze-form__period-fieldset">
        <Field
          class="add-impulze-form__period-field"
          name="hours"
          label="Hours"
          placeholder="1"
          v-model="hours"
          input-type="number"
          has-label-in-row
        />
        <Field
          class="add-impulze-form__period-field"
          name="minutes"
          label="Minutes"
          placeholder="15"
          v-model="minutes"
          input-type="number"
          has-label-in-row
        />
        <Field
          class="add-impulze-form__period-field"
          name="seconds"
          label="Seconds"
          placeholder="20"
          v-model="seconds"
          input-type="number"
          has-label-in-row
        />
      </fieldset>
      <FieldError :error-message="periodErrorMessage" />
    </div>

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

.add-impulze-form__period-label {
  font-weight: bold;
  margin-bottom: $spacing-2;
}

.add-impulze-form__period-fieldset {
  display: flex;
  width: 100%;
  gap: $spacing-2;
}

.add-impulze-form__period-field {
  flex: 1;
}

</style>
