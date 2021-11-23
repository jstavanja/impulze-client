import { createTestingPinia, TestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { useImpulzeStore } from '../stores/impulze'
import ActiveImpulzeList from './ActiveImpulzeList.vue'

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

describe('ActiveImpulzeList', () => {
  beforeEach(() => {
    testingPinia = createTestingPinia()
  })

  it('should display all provided impulze names in the list', () => {
    const impulzeStore = useImpulzeStore()
    impulzeStore.activateImpulzes(impulzeList)

    const { getByText } = render(ActiveImpulzeList, {
      global: {
        plugins: [testingPinia]
      },
      props: {
        activeImpulzes: impulzeList,
      },
    })

    getByText(impulzeList[0].name)
    getByText(impulzeList[1].name)
  })

  it('should display a no active impulzes title if there are no active impulzes', () => {
    const { getByText } = render(ActiveImpulzeList, {
      global: {
        plugins: [testingPinia]
      },
      props: {
        activeImpulzes: [],
      },
    })

    getByText(/no active impulzes/i)
  })
})
