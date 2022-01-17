import { createTestingPinia } from '@pinia/testing'
import { Modal } from '../types/Modal'
import { useModalStore } from './modals'

describe('Modal store', () => {
  beforeEach(() => {
    createTestingPinia()
  })

  it('should know whether a modal is open', () => {
    const modalStore = useModalStore()

    modalStore.openModal(Modal.AddImpulze)

    expect(modalStore.modalIsOpen(Modal.AddImpulze)).toBe(true)
  })

  it('should open a modal', () => {
    const modalStore = useModalStore()

    modalStore.openModal(Modal.AddImpulze)

    expect(modalStore.modalIsOpen(Modal.AddImpulze)).toBe(true)
  })

  it('should close a modal', () => {
    const modalStore = useModalStore()

    modalStore.openModal(Modal.AddImpulze)
    modalStore.closeModal(Modal.AddImpulze)

    expect(modalStore.openModals.length).toBe(0)
    expect(modalStore.modalIsOpen(Modal.AddImpulze)).toBe(false)
  })

  it('should retrieve a modal\'s payload', () => {
    const modalStore = useModalStore()
    const modalPayload = { name: 'test' }

    modalStore.openModal(Modal.EditImpulze, modalPayload)

    expect(modalStore.getModalPayload(Modal.EditImpulze)).toStrictEqual(modalPayload)
  })
})
