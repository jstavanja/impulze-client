import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { fireEvent } from '@testing-library/dom'
import { render } from '@testing-library/vue'
import { useImpulzeStore } from '../stores/impulze'
import { convertMillisecondsToSeconds } from '../utils/time'
import Impulze from './Impulze.vue'

const dummyImpulze = {
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
      },
    })

    const activateButton = getByText(/activate/i)

    await fireEvent.click(activateButton)

    expect(impulzeStore.activeImpulzes.includes(dummyImpulze)).toBe(true)

    getByText(/deactivate/i)
  })
})
