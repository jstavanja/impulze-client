<script setup lang="ts">
import axios from 'axios'
import { mutate } from 'swrv'
import { defineProps } from 'vue'
import API_ROUTES from '../constants/api-routes'
import { useModalStore } from '../stores/modals'
import { ImpulzeResponse } from '../types/Impulze'
import { Modal } from '../types/Modal'
import axiosFetcher from '../utils/fetchers/axios'
import ImpulzeComponent from './Impulze.vue'

const props = defineProps<{
  impulzes: ImpulzeResponse[] | undefined
}>()

const modalStore = useModalStore()

const deleteImpulze = async (impulzeId: number) => {
  try {
    await axios.delete(`${API_ROUTES.IMPULZE.REMOVE}/${impulzeId}`)
    mutate(API_ROUTES.IMPULZE.INDEX, axiosFetcher(API_ROUTES.IMPULZE.INDEX)) // TODO: make this not need a request
  } catch (err) {
    // TODO: add toast notification
    alert('Impulze could not be removed.')
  }
}

const openEditModal = (impulzeWithId: ImpulzeResponse) => {
  modalStore.openModal(Modal.EditImpulze, impulzeWithId)
}
</script>

<template>
  <ul class="impulze-list">
    <li v-for="impulze in props.impulzes" :key="impulze.description">
      <ImpulzeComponent
        :impulze="impulze"
        :delete-impulze-function="deleteImpulze"
        :open-edit-modal-function="openEditModal"
      />
    </li>
  </ul>
</template>

<style lang="scss">
@import '../styles/variables';
.impulze-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2;
}
</style>
