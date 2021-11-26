import { fireEvent, render } from '@testing-library/vue'
import { flushPromises } from '@vue/test-utils'
import mockImpulzes from '../mocks/fixtures/impulzes'
import AddImpulzeForm from './AddImpulzeForm.vue'

describe('Add impulze form', () => {
  test('renders the name field', () => {
    const { getByLabelText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })
    getByLabelText('Name')
  })

  test('renders the description field', () => {
    const { getByLabelText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })
    getByLabelText('Description')
  })

  test('renders the period field', () => {
    const { getByLabelText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })
    getByLabelText('Period')
  })

  test('calls the add impulze function with the correct data', async () => {
    const addImpulzeFunction = jest.fn()

    const { getByLabelText, getByText } = render(AddImpulzeForm, {
      props: {
        addImpulzeFunction
      }
    })

    const nameField = getByLabelText(/name/i)
    const mockName = mockImpulzes[0].name
    await fireEvent.update(nameField, mockName)

    const descriptionField = getByLabelText(/description/i)
    const mockDescription = mockImpulzes[0].description
    await fireEvent.update(descriptionField, mockDescription)

    const periodField = getByLabelText(/period/i)
    const mockPeriod = mockImpulzes[0].period.toString()
    await fireEvent.update(periodField, mockPeriod)

    const addButton = getByText(/add/i)
    await fireEvent.click(addButton)

    expect(addImpulzeFunction).toHaveBeenCalledWith(mockImpulzes[0])
  })

  it('should display the correct error when the name is missing', async () => {
    const { getByLabelText, getByText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })

    const nameField = getByLabelText(/name/i)
    const mockName = mockImpulzes[0].name
    await fireEvent.update(nameField, mockName)
    await fireEvent.update(nameField, '')

    const descriptionField = getByLabelText(/description/i)
    const mockDescription = mockImpulzes[0].description
    await fireEvent.update(descriptionField, mockDescription)

    const periodField = getByLabelText(/period/i)
    const mockPeriod = mockImpulzes[0].period.toString()
    await fireEvent.update(periodField, mockPeriod)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the description is missing', async () => {
    const { getByLabelText, getByText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })

    const nameField = getByLabelText(/name/i)
    const mockName = mockImpulzes[0].name
    await fireEvent.update(nameField, mockName)

    const descriptionField = getByLabelText(/description/i)
    const mockDescription = mockImpulzes[0].description
    await fireEvent.update(descriptionField, mockDescription)
    await fireEvent.update(descriptionField, '')

    const periodField = getByLabelText(/period/i)
    const mockPeriod = mockImpulzes[0].period.toString()
    await fireEvent.update(periodField, mockPeriod)

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })

  it('should display the correct error when the period is missing', async () => {
    const { getByLabelText, getByText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })

    const nameField = getByLabelText(/name/i)
    const mockName = mockImpulzes[0].name
    await fireEvent.update(nameField, mockName)

    const descriptionField = getByLabelText(/description/i)
    const mockDescription = mockImpulzes[0].description
    await fireEvent.update(descriptionField, mockDescription)

    const periodField = getByLabelText(/period/i)
    const mockPeriod = mockImpulzes[0].period.toString()
    await fireEvent.update(periodField, mockPeriod)
    await fireEvent.update(periodField, '')

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('This field is required')
  })
})
