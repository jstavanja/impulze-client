<script setup lang="ts">
import Modal from './atoms/Modal.vue'
import { Modal as ModalEnum } from '../types/Modal'
import ImpulzeForm from './ImpulzeForm.vue'
import { Impulze, ImpulzeResponse } from '../types/Impulze'
import axios from 'axios'
import API_ROUTES from '../constants/api-routes'
import { mutate } from 'swrv'
import axiosFetcher from '../utils/fetchers/axios'
import { useModalStore } from '../stores/modals'
import { computed } from 'vue'
import { useImpulzeStore } from '../stores/impulze'

const modalStore = useModalStore()
const impulzeStore = useImpulzeStore()

interface AddImpulzeResponse extends Impulze {
  active: boolean
  _author: string
  _id: string
}

type EditImpulzeResponse = AddImpulzeResponse

const addImpulze = async (impulze: Impulze) => {
  try {
    await axios.post<AddImpulzeResponse>(API_ROUTES.IMPULZE.STORE, impulze)

    mutate(API_ROUTES.IMPULZE.INDEX, axiosFetcher(API_ROUTES.IMPULZE.INDEX)) // TODO: make this not need a request

    modalStore.closeModal(ModalEnum.AddImpulze)
  } catch (err) {
    // TODO: add toast
    alert('Adding impulze failed')
  }
}

const editImpulze = async (impulze: ImpulzeResponse) => {
  try {
    await axios.patch<EditImpulzeResponse>(`${API_ROUTES.IMPULZE.PATCH}/${impulze.id}`, impulze)

    mutate(API_ROUTES.IMPULZE.INDEX, axiosFetcher(API_ROUTES.IMPULZE.INDEX)) // TODO: make this not need a request

    if (impulzeStore.impulzeIsActive(impulze)) {
      alert('Please deactivate and reactivate the impulze to see the new changes in action.')
    }

    modalStore.closeModal(ModalEnum.EditImpulze)
  } catch (err) {
    // TODO: add toast
    alert('Editing impulze failed')
  }
}

const currentlyActiveAddOrEditImpulzeModal = computed(() => {
  if (modalStore.modalIsOpen(ModalEnum.AddImpulze)) {
    return ModalEnum.AddImpulze
  } else if (modalStore.modalIsOpen(ModalEnum.EditImpulze)) {
    return ModalEnum.EditImpulze
  }
  return null
})

const isAddImpulzeModal = computed(
  () => currentlyActiveAddOrEditImpulzeModal.value === ModalEnum.AddImpulze
)

const isEditImpulzeModal = computed(
  () => currentlyActiveAddOrEditImpulzeModal.value === ModalEnum.EditImpulze
)

const prefilledValues = computed(
  () => {
    if (isEditImpulzeModal.value) {
      return modalStore.getModalPayload<ImpulzeResponse>(ModalEnum.EditImpulze)
    }
    return undefined
  }
)
</script>

<template>
  <Modal
    :modal="currentlyActiveAddOrEditImpulzeModal"
    v-if="currentlyActiveAddOrEditImpulzeModal"
  >
    <h2
      class="impulze-modal__title"
      v-text="
        isAddImpulzeModal
          ? 'Add impulze'
          : 'Edit impulze'
      "
    ></h2>
    <ImpulzeForm
      :add-impulze-function="isAddImpulzeModal ? addImpulze : undefined"
      :edit-impulze-function="isEditImpulzeModal ? editImpulze : undefined"
      :impulze-data="prefilledValues"
    />
  </Modal>
</template>

<style lang="scss">
@import '../styles/variables';
.impulze-modal__title {
  font-size: $font-size-xl;
  font-weight: bold;
}
</style>
