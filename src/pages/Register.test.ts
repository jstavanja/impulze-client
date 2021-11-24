import { render } from '@testing-library/vue'
import Register from './Register.vue'

describe('Register page', () => {
  it('should display the register title', async () => {
    const { getByText } = render(Register)

    getByText('Create an account on ⚡️ Impulze')
  })

  it('should display the registration form', async () => {
    const { getByLabelText, getByRole } = render(Register)

    getByLabelText('E-mail')
    getByLabelText('Username')
    getByLabelText('Password')
    getByLabelText('Confirm password')
    getByRole('button')
  })
})
