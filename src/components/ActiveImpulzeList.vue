<script setup lang="ts">
import { computed } from 'vue'
import { useImpulzeStore } from '../stores/impulze'
import Pill from './atoms/Pill.vue'

const impulzeStore = useImpulzeStore()

const activeImpulzes = computed(() =>
  impulzeStore.activeImpulzes.map(
    (activeImpulzeWithInterval) => activeImpulzeWithInterval.impulze
  )
)
</script>

<template>
  <div class="active-impulze-list">
    <template v-if="activeImpulzes.length === 0">
      <h2 class="active-impulze-list__title">No active impulzes.</h2>
    </template>
    <template v-else>
      <h2 class="active-impulze-list__title">Currently active impulzes:</h2>
      <ul class="active-impulze-list__unordered-list">
        <li
          class="active-impulze-list__item"
          v-for="activeImpulze in activeImpulzes"
          :key="activeImpulze.description"
        >
          <Pill variant="primary">
            {{ activeImpulze.name }}
          </Pill>
        </li>
      </ul>
    </template>
  </div>
</template>

<style lang="scss">
@import '../styles/variables';

.active-impulze-list {
  padding: $spacing-2;
  background-color: $gray-50;
  border: none;
  border-radius: $border-radius;
  margin: $spacing-8 0;
}

.active-impulze-list__title {
  margin-bottom: $spacing-2;
  font-size: $font-size-md;
  font-weight: bold;
}

.active-impulze-list__unordered-list {
  display: flex;
  gap: $spacing-2;
}

.active-impulze-list__item {
  display: inline-flex;

  &:not(:first-child) {
    border-left: 1px solid $black;
    padding-left: $spacing-2;
  }
}
</style>
