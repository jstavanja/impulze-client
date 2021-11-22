import { render } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import AddImpulzeForm from './AddImpulzeForm.vue'

describe('Add impulze form', () => {
  test('renders the name field', () => {
    const { getByLabelText } = render(AddImpulzeForm)
    getByLabelText('Name')
  })

  test('renders the description field', () => {
    const { getByLabelText } = render(AddImpulzeForm)
    getByLabelText('Description')
  })

  test('renders the period field', () => {
    const { getByLabelText } = render(AddImpulzeForm)
    getByLabelText('Period')
  })

  test('fires the submit event with the correct data', async () => {
    const wrapper = mount(AddImpulzeForm)

    const nameField = wrapper.find('input[name="name"]')
    const mockName = 'Impulze name'

    await nameField.setValue(mockName)

    const descriptionField = wrapper.find('input[name="description"]')
    const mockDescription = 'Impulze description'

    await descriptionField.setValue(mockDescription)

    const periodField = wrapper.find('input[name="period"]')
    const mockPeriod = '60'

    await periodField.setValue(mockPeriod)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().submit).toBeTruthy()

    const eventPayload = wrapper.emitted().submit[0] as unknown[]
    expect(eventPayload.length).toBe(1)
    expect(eventPayload[0]).toStrictEqual({
      name: mockName,
      description: mockDescription,
      period: mockPeriod,
    })
  })
})
