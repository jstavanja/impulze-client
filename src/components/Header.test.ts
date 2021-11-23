import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { fireEvent } from '@testing-library/dom'
import { render } from '@testing-library/vue'
import { useModalStore } from '../stores/modals'
import { Modal } from '../types/Modal'
import Header from './Header.vue'

let testingPinia: TestingPinia

describe('Header', () => {
  beforeEach(() => {
    testingPinia = createTestingPinia()
  })

  it('should be able to open the add impulze modal', async () => {
    const modalStore = useModalStore()

    const { getByText } = render(Header, {
      global: {
        plugins: [testingPinia],
      }
    })

    const addImpulzeButton = getByText(/add an impulze/i)

    await fireEvent.click(addImpulzeButton)

    expect(modalStore.modalIsOpen(Modal.AddImpulze)).toBe(true)
  })
})
