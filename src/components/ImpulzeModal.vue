<script setup lang="ts">
import Modal from './atoms/Modal.vue'
import { Modal as ModalEnum } from '../types/Modal'
import AddImpulzeForm from './AddImpulzeForm.vue'
import { Impulze } from '../types/Impulze'

const addImpulze = (impulze: Impulze) => {
  console.log('Sending request to backend with data: ', impulze)
}
</script>

<template>
  <Modal :modal="ModalEnum.AddImpulze">
    <h2 class="impulze-modal__title">Add impulze</h2>
    <AddImpulzeForm @submit="addImpulze" />
  </Modal>
</template>

<style lang="scss">
@import '../styles/variables';
.impulze-modal__title {
  font-size: $font-size-xl;
  font-weight: bold;
}
</style>
