import { defineStore } from 'pinia'
import { Modal, ModalWithPayload } from '../types/Modal'

export const useModalStore = defineStore('modals', {
  state: () => {
    return {
      openModals: [] as ModalWithPayload[],
    }
  },
  getters: {
    modalIsOpen: (state) => {
      return (modal: Modal) => state.openModals.some((modalWithPayload: ModalWithPayload) => modalWithPayload.name === modal)
    },
    getModalPayload: (state) => {
      return <T>(modal: Modal): T => {
        const foundModal = state.openModals.find((modalWithPayload: ModalWithPayload) => modalWithPayload.name === modal)

        return foundModal?.payload as T
      }
    }
  },
  actions: {
    openModal (modal: Modal, payload: unknown = {}) {
      this.openModals.push({
        name: modal,
        payload,
      })
    },
    closeModal (modal: Modal) {
      this.openModals = this.openModals.filter(
        (openModal) => openModal.name !== modal
      )
    },
  },
})
