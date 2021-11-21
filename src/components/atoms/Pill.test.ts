import { render } from '@testing-library/vue'
import Pill from './Pill.vue'

describe('ImpulzeList', () => {
  it('should display all provided impulzes in the list', () => {
    const msg = 'pill text content'
    const { getByText } = render(Pill, {
      slots: {
        default: msg,
      },
    })

    getByText(msg)
  })
})
