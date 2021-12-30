import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { fireEvent, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/vue'
import mockUserInfo from '../mocks/fixtures/user-info'
import { useModalStore } from '../stores/modals'
import { Modal } from '../types/Modal'
import Header from './Header.vue'
import { setupServer } from 'msw/node'
import handlers from '../mocks/handlers'
import { router } from '../routes'

const server = setupServer(...handlers)

let testingPinia: TestingPinia

describe('Header', () => {
  beforeEach(() => {
    localStorage.setItem('impulze_token', '"jwt"')
    testingPinia = createTestingPinia()
  })

  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  it('should be able to open the add impulze modal', async () => {
    const modalStore = useModalStore()

    const { getByText } = render(Header, {
      global: {
        plugins: [testingPinia, router],
      }
    })

    const addImpulzeButton = getByText(/add an impulze/i)

    await fireEvent.click(addImpulzeButton)

    expect(modalStore.modalIsOpen(Modal.AddImpulze)).toBe(true)
  })

  it('should be able to show the username', async () => {
    const { getByText } = render(Header, {
      global: {
        plugins: [testingPinia, router],
      }
    })

    await waitFor(() => {
      getByText(`Welcome back, ${mockUserInfo.email}!`)
    })
  })

  it('should be able to log the player out', async () => {
    const { getByText } = render(Header, {
      global: {
        plugins: [testingPinia, router],
      }
    })

    const logoutButton = getByText(/log out/i)

    fireEvent.click(logoutButton)

    expect(localStorage.getItem('impulze_token')).toBeFalsy()
  })
})
