<script setup lang="ts">
import { useImpulzeStore } from '../stores/impulze'
import { ImpulzeResponse } from '../types/Impulze'
import Button from './atoms/Button.vue'

const props = defineProps<{
  impulzes: ImpulzeResponse[]
}>()

const impulzeStore = useImpulzeStore()

const startAllImpulzes = () => {
  impulzeStore.activateImpulzes(props.impulzes)
}

const stopAllImpulzes = () => {
  impulzeStore.deactivateAllImpulzes()
}
</script>

<template>
  <div class="actions">
    <Button variant="primary" @click="startAllImpulzes">
      Start all impulzes
    </Button>
    <Button variant="secondary" @click="stopAllImpulzes">
      Stop all impulzes
    </Button>
  </div>
</template>

<style lang="scss">
@import '../styles/variables';

.actions {
  display: flex;
  gap: $spacing-2;
  margin-bottom: $spacing-8;
}
</style>
