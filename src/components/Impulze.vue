<script setup lang="ts">
import { defineProps, computed } from 'vue'

import { convertMillisecondsToSplitUnits } from '../utils/time'
import { useImpulzeStore } from '../stores/impulze'
import { ImpulzeResponse } from '../types/Impulze'
import Button from './atoms/Button.vue'

const props = defineProps<{
  impulze: ImpulzeResponse
  deleteImpulzeFunction:(impulzeId: number) => void
  openEditModalFunction:(impulze: ImpulzeResponse) => void
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
  props.deleteImpulzeFunction(props.impulze.id)
}

const openEditModal = () => {
  props.openEditModalFunction(props.impulze)
}
</script>

<template>
  <article class="impulze-card" :class="{ 'impulze-card--is-active': impulzeIsActive }">
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
            {{ convertMillisecondsToSplitUnits(props.impulze.period) }}
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
      <Button variant="secondary" size="small" @click="openEditModal">
        Edit
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

.impulze-card--is-active {
  border-left: 10px solid greenyellow;

  transition: border-left-width 0.1s ease-in;
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
