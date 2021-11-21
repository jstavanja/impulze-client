<script setup lang="ts">
import { useModalStore } from '../stores/modals'
import { Modal } from '../types/Modal'
import Button from './atoms/Button.vue'
const currentlyLoggedInUser = 'Jaka' // TODO: useUser

const modalStore = useModalStore()

const openAddImpulzeModal = () => {
  modalStore.openModal(Modal.AddImpulze)
}
</script>

<template>
  <header>
    <div class="header__wrapper">
      <div class="header__brand">
        <span class="header__brand-name">Impulze</span>

        <Button @click="openAddImpulzeModal">Add an Impulze</Button>
      </div>

      <div class="header__actions">
        <div>Welcome back, {{ currentlyLoggedInUser }}!</div>
        <Button variant="secondary">Log out</Button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.header__wrapper {
  @include limit-max-width;
  display: flex;
  justify-content: space-between;
  padding: $spacing-2;
}

.header__brand-name {
  font-size: $font-size-xl;
  font-weight: bold;
  margin-right: $spacing-4;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: $spacing-2;
}
</style>
