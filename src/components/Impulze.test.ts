import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { fireEvent } from '@testing-library/dom'
import { render, waitFor } from '@testing-library/vue'
import { useImpulzeStore } from '../stores/impulze'
import { ImpulzeResponse } from '../types/Impulze'
import { impulzesAreEqual } from '../utils/comparison'
import { convertMillisecondsToSplitUnits } from '../utils/time'
import Impulze from './Impulze.vue'

const dummyImpulze: ImpulzeResponse = {
  id: 1,
  name: 'Test impulze #2',
  description: 'This is a testing impulze',
  period: 10000,
}

let testingPinia: TestingPinia

describe('Impulze', () => {
  beforeEach(() => {
    testingPinia = createTestingPinia()
  })

  it('should display the impulze information', () => {
    const { getByText } = render(Impulze, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        impulze: dummyImpulze,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        deleteImpulzeFunction: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        openEditModalFunction: () => {}
      },
    })

    getByText(dummyImpulze.name)
    getByText(dummyImpulze.description)
    getByText(convertMillisecondsToSplitUnits(dummyImpulze.period))
  })

  it('should add the current impulze to the active list in the store when pressing activate', async () => {
    const impulzeStore = useImpulzeStore()

    const { getByText } = render(Impulze, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        impulze: dummyImpulze,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        deleteImpulzeFunction: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        openEditModalFunction: () => {}
      },
    })

    const activateButton = getByText(/activate/i)

    await fireEvent.click(activateButton)

    const impulzeWithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulze))
    expect(impulzeWithIntervalId).toBeDefined()

    await waitFor(() => {
      getByText(/deactivate/i)
    })
  })

  it('should call the impulze delete function with the correct parameter when pressing remove', async () => {
    const deleteImpulzeFunction = jest.fn()

    const { getByText } = render(Impulze, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        impulze: dummyImpulze,
        deleteImpulzeFunction,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        openEditModalFunction: () => {}
      },
    })

    const removeButton = getByText(/remove/i)

    await fireEvent.click(removeButton)

    expect(deleteImpulzeFunction).toBeCalledWith(dummyImpulze.id)
  })

  it('should open the edit impulze modal when pressing edit', async () => {
    const openEditModalFunction = jest.fn()

    const { getByText } = render(Impulze, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        impulze: dummyImpulze,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        deleteImpulzeFunction: () => {},
        openEditModalFunction
      },
    })

    const editButton = getByText(/edit/i)

    await fireEvent.click(editButton)

    expect(openEditModalFunction).toBeCalledWith(dummyImpulze)
  })
})
