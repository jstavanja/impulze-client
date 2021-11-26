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

    const { getByText } = render(ImpulzeModal, {
      global: {
        plugins: [testingPinia],
      },
    })

    getByText('Add impulze')
  })

  it('should display the necessary fields', async () => {
    const testingPinia = createTestingPinia()
    const modalStore = useModalStore()

    modalStore.openModal(Modal.AddImpulze)

    const { getByLabelText, getByText } = render(ImpulzeModal, {
      global: {
        plugins: [testingPinia],
      },
    })

    getByLabelText('Name')
    getByLabelText('Description')
    getByLabelText('Period')
    getByText('Add')
  })
})
