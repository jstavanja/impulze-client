/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Link from './Link.vue'

const routes = [
  { path: '/', component: () => {}, meta: { requiresAuth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('Field', () => {
  it('should display the slot content', () => {
    const msg = 'testing link content'
    const { getByText } = render(Link, {
      props: {
        to: '/'
      },
      slots: {
        default: msg
      },
      global: {
        plugins: [router]
      }
    })

    getByText(msg)
  })

  // TODO: add test to know whether the route changes correctly
})
