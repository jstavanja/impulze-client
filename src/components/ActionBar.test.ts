import { render } from '@testing-library/vue'
import ActionBar from './ActionBar.vue'

describe('ActionBar', () => {
  it('should display the expected action buttons', () => {
    const { getByText } = render(ActionBar)

    getByText('Start all impulzes')
    getByText('Stop all impulzes')
  })
})
