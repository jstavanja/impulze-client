import { render, fireEvent } from '@testing-library/vue'
import LoginForm from './LoginForm.vue'
import { setupServer } from 'msw/node'
import handlers from '../mocks/handlers'

const server = setupServer(...handlers)

describe('Login form', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  it('should display the necessary fields', async () => {
    const { getByLabelText, getByRole } = render(LoginForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loginFunction: () => {}
      }
    })

    getByLabelText('E-mail')
    getByLabelText('Password')
    getByRole('button')
  })

  it('should call the loginFunction with the correct parameters if data is valid', async () => {
    const loginFunction = jest.fn()
    const { getByLabelText, getByRole } = render(LoginForm, {
      props: {
        loginFunction
      }
    })

    const emailField = getByLabelText('E-mail')

    const mockEmail = 'john.doe@impulze.io'
    await fireEvent.update(emailField, mockEmail)

    const passwordField = getByLabelText('Password')

    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const loginButton = getByRole('button')

    await fireEvent.click(loginButton)

    expect(loginFunction).toBeCalledWith(mockEmail, mockPassword)
  })
})
