<script setup lang="ts">
import { defineProps } from 'vue'
import { Impulze } from '../types/Impulze'
import Button from './atoms/Button.vue'
const props = defineProps<{
  impulze: Impulze
}>()
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
      <Button variant="primary">Activate</Button>
      <Button variant="alert">Remove</Button>
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
  gap: $spacing-2;
}
</style>
