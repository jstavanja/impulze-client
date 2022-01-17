/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Register from './Register.vue'
import LoginPage from './Login.vue'

const routes = [
  { path: '/', component: () => {}, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage, meta: { requiresUnauth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('Register page', () => {
  it('should display the register title', async () => {
    const { getByText } = render(Register, {
      global: {
        plugins: [router]
      }
    })

    getByText('Create an account on ⚡️ Pulses')
  })

  it('should display the registration form', async () => {
    const { getByLabelText, getByRole } = render(Register, {
      global: {
        plugins: [router]
      }
    })

    getByLabelText('E-mail')
    getByLabelText('Username')
    getByLabelText('Password')
    getByLabelText('Confirm password')
    getByRole('button')
  })

  it('should display the login link', async () => {
    const { getByText } = render(Register, {
      global: {
        plugins: [router]
      }
    })

    getByText('Already have an account? Log in here.')
  })
})
