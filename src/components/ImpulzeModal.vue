<script setup lang="ts">
import Modal from './atoms/Modal.vue'
import { Modal as ModalEnum } from '../types/Modal'
</script>

<template>
  <Modal :modal="ModalEnum.AddImpulze">
    <div>
      <h2>Add new / edit impulze</h2>
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" placeholder="My cool impulze" name="name" />

      <label for="description">Description:</label>
      <input
        type="text"
        placeholder="This impulze is meant for ..."
        name="description"
      />

      <label for="period">Period:</label>
      <input type="text" placeholder="5m" name="period" />
    </div>
  </Modal>
</template>
