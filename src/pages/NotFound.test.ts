/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './NotFound.vue'

const routes = [
  { path: '/', component: () => {}, meta: { requiresAuth: true } },
  { path: '/login', component: () => {}, meta: { requiresUnauth: true } },
  { path: '/register', component: () => {}, meta: { requiresUnauth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('Not found page', () => {
  it('should display the not found title', async () => {
    const { getByText } = render(NotFound, {
      global: {
        plugins: [router]
      }
    })

    getByText(/Page not found/i)
  })

  it('should display the go to the homepage link', async () => {
    const { getByText } = render(NotFound, {
      global: {
        plugins: [router]
      }
    })

    getByText('Go back to the homepage!')
  })
})
