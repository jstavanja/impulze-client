import { render, fireEvent } from '@testing-library/vue'
import Button from './Button.vue'

describe('Button', () => {
  it('should display slot text', () => {
    const msg = 'Hello Vue 3'
    const { getByText } = render(Button, {
      slots: {
        default: msg
      }
    })

    getByText(msg)
  })

  it('should emit the click event when pressed', async () => {
    const msg = 'click me'
    const { getByText, emitted } = render(Button, {
      slots: {
        default: msg
      }
    })

    const button = getByText(msg)

    await fireEvent.click(button)

    expect(emitted().click).toBeTruthy()
  })

  it('should not emit the click event when disabled and pressed', async () => {
    const msg = 'click me'
    const { getByText, emitted } = render(Button, {
      slots: {
        default: msg
      },
      props: {
        disabled: true
      }
    })

    const button = getByText(msg)

    await fireEvent.click(button)

    expect(emitted().click).not.toBeTruthy()
  })
})
