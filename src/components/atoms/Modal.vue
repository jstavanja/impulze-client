<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '../../stores/modals'
import { Modal } from '../../types/Modal'
import Button from '../atoms/Button.vue'

const props = defineProps<{
  modal: Modal
}>()

const modalStore = useModalStore()

const modalIsActive = computed(() => modalStore.modalIsOpen(props.modal))

const closeModal = () => {
  modalStore.closeModal(props.modal)
}
</script>

<template>
  <div class="modal" v-if="modalIsActive">
    <Button
      variant="alert"
      @click="closeModal"
      class="modal__close-button"
    >
      &#10005;
    </Button>
    <slot />
  </div>
  <div class="modal-overlay" v-if="modalIsActive"></div>
</template>

<style lang="scss">
@import '../../styles/variables';

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  min-height: 400px;
  padding: 10px 20px;
  overflow: auto;

  background-color: $white;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal__close-button {
  position: absolute;
  top: $spacing-2;
  right: $spacing-2;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba($black, 0.6);
}
</style>
