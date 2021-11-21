import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { useModalStore } from '../stores/modals'
import { Modal } from '../types/Modal'
import ImpulzeModal from './ImpulzeModal.vue'

describe('Login form', () => {
  test('renders title', () => {
    const testingPinia = createTestingPinia()
    const modalStore = useModalStore()

    modalStore.openModal(Modal.AddImpulze)

    const msg = 'modal text content'

    const { getByText } = render(ImpulzeModal, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        modal: Modal.AddImpulze,
      },
      slots: {
        default: msg,
      },
    })

    getByText('Add impulze')
  })
})
