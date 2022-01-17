import { render, fireEvent } from '@testing-library/vue'
import RegistrationForm from './RegistrationForm.vue'
import { setupServer } from 'msw/node'
import handlers from '../mocks/handlers'
import { flushPromises } from '@vue/test-utils'

const server = setupServer(...handlers)

describe('Registration form', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  it('should display the necessary fields', async () => {
    const { getByLabelText, getByRole } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    getByLabelText('E-mail')
    getByLabelText('Username')
    getByLabelText('Password')
    getByLabelText('Confirm password')
    getByRole('button')
  })

  it('should call the registerFunction with the correct parameters if data is valid', async () => {
    const registerFunction = jest.fn()
    const { getByLabelText, getByRole } = render(RegistrationForm, {
      props: {
        registerFunction
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'john.doe@pulses.io'
    await fireEvent.update(emailField, mockEmail)

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'verysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)

    const registerButton = getByRole('button')

    await fireEvent.click(registerButton)

    expect(registerFunction).toBeCalledWith(mockEmail, mockUsername, mockPassword, mockConfirmPassword)
  })

  it('should not call the registerFunction if data is not valid', async () => {
    const registerFunction = jest.fn()
    const { getByLabelText, getByRole } = render(RegistrationForm, {
      props: {
        registerFunction
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'verysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    const registerButton = getByRole('button')
    await fireEvent.click(registerButton)

    expect(registerFunction).not.toBeCalled()
  })

  it('should display the correct error when the email is malformed', async () => {
    const { getByLabelText, getByText } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('You must enter a valid email')
  })

  it('should display the correct error when the email is missing', async () => {
    const { getByLabelText, getByText } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)
    await fireEvent.update(emailField, '')

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'verysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the username is missing', async () => {
    const { getByLabelText, getByText } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'notanemail'
    await fireEvent.update(emailField, mockEmail)

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)
    await fireEvent.update(usernameField, '')

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'verysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the password is missing', async () => {
    const { getByLabelText, getByText } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'john.doe@pulses.io'
    await fireEvent.update(emailField, mockEmail)

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)
    await fireEvent.update(passwordField, '')

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'verysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the confirmation password is missing', async () => {
    const { getByLabelText, getByText } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'john.doe@pulses.io'
    await fireEvent.update(emailField, mockEmail)

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'verysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)
    await fireEvent.update(confirmPasswordField, '')

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the confirmation password is not the same as the password', async () => {
    const { getByLabelText, getByText } = render(RegistrationForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerFunction: () => {}
      }
    })

    const emailField = getByLabelText('E-mail')
    const mockEmail = 'john.doe@pulses.io'
    await fireEvent.update(emailField, mockEmail)

    const usernameField = getByLabelText('Username')
    const mockUsername = 'johndoe'
    await fireEvent.update(usernameField, mockUsername)

    const passwordField = getByLabelText('Password')
    const mockPassword = 'verysecure123'
    await fireEvent.update(passwordField, mockPassword)

    const confirmPasswordField = getByLabelText('Confirm password')
    const mockConfirmPassword = 'notverysecure123'
    await fireEvent.update(confirmPasswordField, mockConfirmPassword)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('Passwords do not match')
  })
})
