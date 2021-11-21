import { render } from '@testing-library/vue'
import Pill from './Pill.vue'

describe('Pill', () => {
  it('should display items passed into the default slot', () => {
    const msg = 'pill text content'
    const { getByText } = render(Pill, {
      slots: {
        default: msg,
      },
    })

    getByText(msg)
  })
})
