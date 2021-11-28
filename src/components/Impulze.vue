<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useImpulzeStore } from '../stores/impulze'
import { ImpulzeResponse } from '../types/Impulze'
import Button from './atoms/Button.vue'

const props = defineProps<{
  impulze: ImpulzeResponse
  deleteImpulzeFunction:(impulzeId: string) => void
}>()

const impulzeStore = useImpulzeStore()

const impulzeIsActive = computed(() =>
  impulzeStore.impulzeIsActive(props.impulze)
)

const activateImpulze = () => {
  impulzeStore.activateImpulze(props.impulze)
}

const deactivateImpulze = () => {
  impulzeStore.deactivateImpulze(props.impulze)
}

const deleteImpulze = () => {
  props.deleteImpulzeFunction(props.impulze._id)
}
</script>

<template>
  <article class="impulze-card">
    <div class="impulze-card__content">
      <h3 class="impulze-card__title">
        {{ props.impulze.name }}
      </h3>
      <p class="impulze-card__description">
        {{ props.impulze.description }}
      </p>
      <div>
        <span>
          Period:
          <span class="impulze-card__period-value">
            {{ props.impulze.period / 1000 }} s
          </span>
        </span>
      </div>
    </div>
    <div class="impulze-card__actions">
      <Button
        variant="primary"
        @click="activateImpulze"
        v-if="!impulzeIsActive"
        custom-class="impulze-card__activate-action"
      >
        Activate
      </Button>
      <Button variant="secondary" @click="deactivateImpulze" v-else>
        Deactivate
      </Button>
      <Button variant="alert" size="small" @click="deleteImpulze">
        Remove
      </Button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
.impulze-card {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: none;
  border-radius: $border-radius;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.impulze-card__title {
  font-size: $font-size-3xl;
  font-weight: bold;
  margin-bottom: $spacing-1;
}

.impulze-card__description {
  margin-bottom: $spacing-1;
}

.impulze-card__period-value {
  font-weight: bold;
  font-style: italic;
}

.impulze-card__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-2;
}
</style>
