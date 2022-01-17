<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { number, string } from 'yup'
import { Impulze, ImpulzeResponse } from '../types/Impulze'
import {
  convertMillisecondsToSplitUnitsObject,
  convertSplitUnitsToMilliseconds,
} from '../utils/time'
import Button from './atoms/Button.vue'
import Field from './atoms/Field.vue'
import FieldError from './atoms/FieldError.vue'

const props = defineProps<{
  addImpulzeFunction?:(impulze: Impulze) => void
  editImpulzeFunction?:(impulze: ImpulzeResponse) => void
  impulzeData?: ImpulzeResponse
}>()

const {
  value: name,
  errorMessage: nameErrorMessage,
} = useField<string>('name', string().required('This field is required'), {
  initialValue: props.impulzeData?.name,
})

const {
  value: description,
  errorMessage: descriptionErrorMessage,
} = useField<string>(
  'description',
  string().required('This field is required'),
  {
    initialValue: props.impulzeData?.description,
  }
)

const initialPeriodValues = computed(() => {
  if (props.impulzeData?.period) {
    return convertMillisecondsToSplitUnitsObject(props.impulzeData.period)
  }
  return null
})

const hours = ref(initialPeriodValues.value?.hours.toString() || '')
const minutes = ref(initialPeriodValues.value?.minutes.toString() || '')
const seconds = ref(initialPeriodValues.value?.seconds.toString() || '')

const {
  value: period,
  errorMessage: periodErrorMessage,
} = useField<number>(
  'period',
  number()
    .required('A period is required')
    .moreThan(0, 'The period has to be bigger than 0 seconds'),
  {
    initialValue: props.impulzeData?.period,
  }
)

const periodInMilliseconds = computed(() => {
  return convertSplitUnitsToMilliseconds(
    parseInt(hours.value || '0'),
    parseInt(minutes.value || '0'),
    parseInt(seconds.value || '0')
  )
})

watch(periodInMilliseconds, (value) => {
  period.value = value
})

const formInvalid = computed(
  () =>
    !!nameErrorMessage.value ||
    !!descriptionErrorMessage.value ||
    !!periodErrorMessage.value ||
    !period.value ||
    !description.value ||
    !name.value
)

const isAddImpulzeForm = computed(() => props.addImpulzeFunction !== undefined)

const callAddOrEditImpulzeFunction = () => {
  if (formInvalid.value) return

  if (typeof period.value !== 'number') {
    period.value = parseInt(period.value)
  }

  const newImpulze: Impulze = {
    name: name.value,
    description: description.value,
    period: period.value,
  }

  if (props.addImpulzeFunction) {
    props.addImpulzeFunction(newImpulze)
  } else if (props.editImpulzeFunction && props.impulzeData) {
    props.editImpulzeFunction({ ...newImpulze, id: props.impulzeData.id })
  }
}
</script>

<template>
  <form @submit.prevent class="impulze-form">
    <Field
      class="impulze-form__name-field"
      name="name"
      label="Name"
      placeholder="My cool impulze"
      v-model="name"
      :error-message="nameErrorMessage"
    />
    <Field
      class="impulze-form__description-field"
      name="description"
      label="Description"
      placeholder="This impulze is meant to notify me about ..."
      v-model="description"
      :error-message="descriptionErrorMessage"
    />
    <div class="impulze-form__period-section">
      <div class="impulze-form__period-label">Period:</div>
      <fieldset class="impulze-form__period-fieldset">
        <Field
          class="impulze-form__period-field"
          name="hours"
          label="Hours"
          placeholder="1"
          v-model="hours"
          input-type="number"
          has-label-in-row
        />
        <Field
          class="impulze-form__period-field"
          name="minutes"
          label="Minutes"
          placeholder="15"
          v-model="minutes"
          input-type="number"
          has-label-in-row
        />
        <Field
          class="impulze-form__period-field"
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
      @click="callAddOrEditImpulzeFunction"
      custom-class="impulze-form__add-button"
      :disabled="formInvalid"
      v-text="isAddImpulzeForm ? 'Add' : 'Edit'"
    >
    </Button>
  </form>
</template>

<style lang="scss">
@import '../styles/variables';

.impulze-form__name-field {
  margin-top: $spacing-4;
}

.impulze-form__period-label {
  font-weight: bold;
  margin-bottom: $spacing-2;
}

.impulze-form__period-fieldset {
  display: flex;
  width: 100%;
  gap: $spacing-2;
}

.impulze-form__period-field {
  flex: 1;
}
</style>
