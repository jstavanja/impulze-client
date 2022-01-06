import { render } from '@testing-library/vue'
import FieldError from './FieldError.vue'

describe('Field', () => {
  it('should display the error text when provided', () => {
    const errorMessage = 'This is an error message'
    const { getByText } = render(FieldError, {
      props: {
        errorMessage,
      },
    })

    getByText(errorMessage)
  })
})
