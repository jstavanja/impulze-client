import { defineStore } from 'pinia'
import { Modal } from '../types/Modal'

export const useModalStore = defineStore('modals', {
  state: () => {
    return {
      openModals: [] as Modal[],
    }
  },
  getters: {
    modalIsOpen: (state) => {
      return (modal: Modal) => state.openModals.includes(modal)
    },
  },
  actions: {
    openModal (modal: Modal) {
      this.openModals.push(modal)
    },
    closeModal (modal: Modal) {
      this.openModals = this.openModals.filter(
        (openModal) => openModal !== modal
      )
    },
  },
})
