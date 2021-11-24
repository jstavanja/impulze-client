import { render } from '@testing-library/vue'
import Login from './Login.vue'

describe('Login page', () => {
  it('should display the login title', async () => {
    const { getByText } = render(Login)

    getByText('Log in to ⚡️ Impulze')
  })

  it('should display the login form', async () => {
    const { getByLabelText, getByRole } = render(Login)

    getByLabelText('E-mail')
    getByLabelText('Password')
    getByRole('button')
  })
})
