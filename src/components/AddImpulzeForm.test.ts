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

  test('renders the period fields', () => {
    const { getByLabelText } = render(AddImpulzeForm, {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addImpulzeFunction: () => {}
      }
    })

    getByLabelText(/hours/i)
    getByLabelText(/minutes/i)
    getByLabelText(/seconds/i)
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

    const hoursField = getByLabelText(/hours/i)
    await fireEvent.update(hoursField, '1')

    const minutesField = getByLabelText(/minutes/i)
    await fireEvent.update(minutesField, '2')

    const secondsField = getByLabelText(/seconds/i)
    await fireEvent.update(secondsField, '3')

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

    const hoursField = getByLabelText(/hours/i)
    await fireEvent.update(hoursField, '1')

    const minutesField = getByLabelText(/minutes/i)
    await fireEvent.update(minutesField, '2')

    const secondsField = getByLabelText(/seconds/i)
    await fireEvent.update(secondsField, '3')

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

    const hoursField = getByLabelText(/hours/i)
    await fireEvent.update(hoursField, '1')

    const minutesField = getByLabelText(/minutes/i)
    await fireEvent.update(minutesField, '2')

    const secondsField = getByLabelText(/seconds/i)
    await fireEvent.update(secondsField, '3')

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

    const hoursField = getByLabelText(/hours/i)
    await fireEvent.update(hoursField, '1')
    await fireEvent.update(hoursField, '')

    const minutesField = getByLabelText(/minutes/i)
    await fireEvent.update(minutesField, '')

    const secondsField = getByLabelText(/seconds/i)
    await fireEvent.update(secondsField, '')

    await flushPromises() // this must be here because vee-validate needs time to validate data

    getByText('The period has to be bigger than 0 seconds')
  })
})
