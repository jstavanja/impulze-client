import { render, fireEvent } from '@testing-library/vue'
import LoginForm from './LoginForm.vue'
import { setupServer } from 'msw/node'
import handlers from '../mocks/handlers'
import { flushPromises } from '@vue/test-utils'

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

    const mockEmail = 'john.doe@pulses.io'
    await fireEvent.update(emailField, mockEmail)

    const passwordField = getByLabelText('Password')

    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const loginButton = getByRole('button')

    await fireEvent.click(loginButton)

    expect(loginFunction).toBeCalledWith(mockEmail, mockPassword)
  })

  it('should not call the loginFunction if data is not valid', async () => {
    const loginFunction = jest.fn()
    const { getByLabelText, getByRole } = render(LoginForm, {
      props: {
        loginFunction
      }
    })

    const emailField = getByLabelText('E-mail')

    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)

    const passwordField = getByLabelText('Password')

    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    const loginButton = getByRole('button')
    await fireEvent.click(loginButton)

    expect(loginFunction).not.toBeCalled()
  })

  it('should display the correct error when the email is malformed', async () => {
    const { getByLabelText, getByText } = render(LoginForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loginFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')

    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('You must enter a valid email')
  })

  it('should display the correct error when the email is missing', async () => {
    const { getByLabelText, getByText } = render(LoginForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loginFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')

    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)
    await fireEvent.update(emailField, '')

    const passwordField = getByLabelText('Password')

    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the password is missing', async () => {
    const { getByLabelText, getByText } = render(LoginForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loginFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')

    const mockEmail = 'john.doe@pulses.io'
    await fireEvent.update(emailField, mockEmail)

    const passwordField = getByLabelText('Password')

    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)
    await fireEvent.update(passwordField, '')

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })
})
