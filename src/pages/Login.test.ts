/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './Login.vue'

const routes = [
  { path: '/', component: () => {}, meta: { requiresAuth: true } },
  { path: '/login', component: () => {}, meta: { requiresUnauth: true } },
  { path: '/register', component: () => {}, meta: { requiresUnauth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('Login page', () => {
  it('should display the login title', async () => {
    const { getByText } = render(Login, {
      global: {
        plugins: [router]
      }
    })

    getByText('Log in to ⚡️ Pulses')
  })

  it('should display the login form', async () => {
    const { getByLabelText, getByRole } = render(Login, {
      global: {
        plugins: [router]
      }
    })

    getByLabelText('E-mail')
    getByLabelText('Password')
    getByRole('button')
  })

  it('should display the registration link', async () => {
    const { getByText } = render(Login, {
      global: {
        plugins: [router]
      }
    })

    getByText('Don\'t have an account yet? Register here.')
  })
})
