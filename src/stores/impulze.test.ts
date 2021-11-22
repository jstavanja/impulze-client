import { createTestingPinia } from '@pinia/testing'
import { useImpulzeStore } from '../stores/impulze'
import { impulzesAreEqual } from '../utils/comparison'

const dummyImpulzes = [
  {
    name: 'Test impulze #1',
    description: 'This is a testing impulze',
    period: 10000,
  },
  {
    name: 'Test impulze #2',
    description: 'This is another testing impulze',
    period: 2000,
  }
]

describe('Impulze store', () => {
  beforeEach(() => {
    createTestingPinia()
  })

  it('should activate an impulze without duplicating', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulze(dummyImpulzes[0])
    impulzeStore.activateImpulze(dummyImpulzes[0])

    expect(impulzeStore.activeImpulzes.length).toBe(1)

    const impulzeWithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulzes[0]))

    expect(impulzeWithIntervalId).toBeDefined()
  })

  it('should deactivate an impulze', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulze(dummyImpulzes[0])
    impulzeStore.activateImpulze(dummyImpulzes[1])
    impulzeStore.deactivateImpulze(dummyImpulzes[0])

    expect(impulzeStore.activeImpulzes.length).toBe(1)
    const impulzeWithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulzes[0]))
    expect(impulzeWithIntervalId).not.toBeDefined()
  })

  it('should activate all impulzes from array', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulzes(dummyImpulzes)

    expect(impulzeStore.activeImpulzes.length).toBe(dummyImpulzes.length)

    const impulze1WithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulzes[0]))
    expect(impulze1WithIntervalId).toBeDefined()

    const impulze2WithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulzes[1]))
    expect(impulze2WithIntervalId).toBeDefined()
  })

  it('should deactivate all impulzes', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulze(dummyImpulzes[0])
    impulzeStore.deactivateAllImpulzes()

    expect(impulzeStore.activeImpulzes.length).toBe(0)
  })

  it('should activate all impulzes from array', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulzes(dummyImpulzes)

    expect(impulzeStore.activeImpulzes.length).toBe(dummyImpulzes.length)

    const impulze1WithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulzes[0]))
    expect(impulze1WithIntervalId).toBeDefined()

    const impulze2WithIntervalId = impulzeStore.activeImpulzes.find(activeImpulze => impulzesAreEqual(activeImpulze.impulze, dummyImpulzes[1]))
    expect(impulze2WithIntervalId).toBeDefined()
  })

  it('should compute whether an impulze is active', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulze(dummyImpulzes[0])

    expect(impulzeStore.impulzeIsActive(dummyImpulzes[0])).toBe(true)
  })
})
