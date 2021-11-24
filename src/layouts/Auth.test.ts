import { render } from '@testing-library/vue'
import Auth from './Auth.vue'

describe('Auth layout', () => {
  it('should display the content passed into the props', async () => {
    const msg = 'test content'
    const { getByText } = render(Auth, {
      slots: {
        default: msg
      }
    })

    getByText(msg)
  })
})
