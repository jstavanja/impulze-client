import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { fireEvent } from '@testing-library/dom'
import { render } from '@testing-library/vue'
import { useImpulzeStore } from '../stores/impulze'
import { impulzesAreEqual } from '../utils/comparison'
import { convertMillisecondsToSeconds } from '../utils/time'
import Impulze from './Impulze.vue'

const dummyImpulze = {
  _id: 'asodijaod12e98j',
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
        deleteImpulzeFunction: () => {}
      },
    })

    getByText(dummyImpulze.name)
    getByText(dummyImpulze.description)
    getByText(`${convertMillisecondsToSeconds(dummyImpulze.period)} s`)
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
        deleteImpulzeFunction: () => {}
      },
    })

    const activateButton = getByText(/activate/i)

    await fireEvent.click(activateButton)

    const impulzeWithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulze))
    expect(impulzeWithIntervalId).toBeDefined()

    getByText(/deactivate/i)
  })

  it('should call the impulze delete function with the correct parameter when pressing remove', async () => {
    const deleteImpulzeFunction = jest.fn()

    const { getByText } = render(Impulze, {
      global: {
        plugins: [testingPinia],
      },
      props: {
        impulze: dummyImpulze,
        deleteImpulzeFunction
      },
    })

    const removeButton = getByText(/remove/i)

    await fireEvent.click(removeButton)

    expect(deleteImpulzeFunction).toBeCalledWith(dummyImpulze._id)
  })
})
