import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { useImpulzeStore } from '../stores/impulze'
import { activeImpulzeListContainsOnlyImpulzes } from '../utils/testing'
import ActionBar from './ActionBar.vue'

const impulzeList = [
  {
    name: 'Test impulze #1',
    description: 'This is a testing impulze',
    period: 10000,
  },
  {
    name: 'Test impulze #2',
    description: 'This is another testing impulze',
    period: 5000,
  },
]

let testingPinia: TestingPinia

describe('ActionBar', () => {
  beforeEach(() => {
    testingPinia = createTestingPinia()
  })

  it('should display the expected action buttons', () => {
    const { getByText } = render(ActionBar, {
      global: {
        plugins: [testingPinia]
      },
      props: {
        impulzes: []
      }
    })

    getByText('Start all impulzes')
    getByText('Stop all impulzes')
  })

  it('should start all impulzes', async () => {
    const impulzeStore = useImpulzeStore()

    const { getByText } = render(ActionBar, {
      global: {
        plugins: [testingPinia]
      },
      props: {
        impulzes: impulzeList
      }
    })

    const startAllImpulzesButton = getByText(/start all impulzes/i)

    await startAllImpulzesButton.click()

    const activeImpulzesEqualImpulzeList = activeImpulzeListContainsOnlyImpulzes(impulzeStore.activeImpulzes, impulzeList)

    expect(activeImpulzesEqualImpulzeList).toBe(true)
  })

  it('should stop all impulzes', async () => {
    const impulzeStore = useImpulzeStore()

    const { getByText } = render(ActionBar, {
      global: {
        plugins: [testingPinia]
      },
      props: {
        impulzes: []
      }
    })

    impulzeStore.activateImpulze(impulzeList[0])

    const stopAllImpulzesButton = getByText(/stop all impulzes/i)

    await stopAllImpulzesButton.click()

    expect(impulzeStore.activeImpulzes.length).toEqual(0)
  })
})
