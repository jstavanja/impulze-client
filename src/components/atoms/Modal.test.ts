import { render } from '@testing-library/vue'
import Modal from './Modal.vue'
import { createTestingPinia } from '@pinia/testing'
import { useModalStore } from '../../stores/modals'
import { Modal as ModalEnum } from '../../types/Modal'

describe('Modal', () => {
  it('should display items passed into the default slot', () => {
    const testingPinia = createTestingPinia()
    const modalStore = useModalStore()

    modalStore.openModal(ModalEnum.AddImpulze)

    const msg = 'modal text content'

    const { getByText } = render(Modal, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        modal: ModalEnum.AddImpulze,
      },
      slots: {
        default: msg,
      },
    })

    getByText(msg)
  })
})
