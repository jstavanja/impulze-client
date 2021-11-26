<script setup lang="ts">
import Modal from './atoms/Modal.vue'
import { Modal as ModalEnum } from '../types/Modal'
import AddImpulzeForm from './AddImpulzeForm.vue'
import { Impulze } from '../types/Impulze'
import axios from 'axios'
import API_ROUTES from '../constants/api-routes'
import { mutate } from 'swrv'
import axiosFetcher from '../utils/fetchers/axios'
import { useModalStore } from '../stores/modals'

const modalStore = useModalStore()

interface AddImpulzeResponse extends Impulze {
  active: boolean;
  _author: string;
  _id: string;
}

const addImpulze = async (impulze: Impulze) => {
  try {
    await axios.post<AddImpulzeResponse>(
      API_ROUTES.IMPULZE.STORE,
      impulze
    )

    mutate(API_ROUTES.IMPULZE.INDEX, axiosFetcher(API_ROUTES.IMPULZE.INDEX)) // TODO: make this not need a request

    modalStore.closeModal(ModalEnum.AddImpulze)
  } catch (err) {
    // TODO: add toast
    alert('Adding impulze failed')
  }
}
</script>

<template>
  <Modal :modal="ModalEnum.AddImpulze">
    <h2 class="impulze-modal__title">Add impulze</h2>
    <AddImpulzeForm :add-impulze-function="addImpulze" />
  </Modal>
</template>

<style lang="scss">
@import '../styles/variables';
.impulze-modal__title {
  font-size: $font-size-xl;
  font-weight: bold;
}
</style>
