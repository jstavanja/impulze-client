/* eslint-disable vue/one-component-per-file */
import { render } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Field from './Field.vue'

const label = 'Username'
const name = 'username'

describe('Field', () => {
  it('should display label name in a label', () => {
    const { getByText } = render(Field, {
      props: {
        label,
        name,
      },
    })

    getByText(label)
  })

  it('should emit the correct event for using v-model', async () => {
    const wrapper = mount(Field, {
      props: {
        label,
        name,
      },
    })

    const usernameField = wrapper.find('input[name="username"]')
    const mockUsername = 'tester1'

    await usernameField.setValue(mockUsername)

    const emittedUpdateEvent = wrapper.emitted()['update:modelValue']

    expect(emittedUpdateEvent).toBeTruthy()

    const eventPayload = emittedUpdateEvent[0] as unknown[]

    expect(eventPayload[0]).toBe(mockUsername)
  })
})
