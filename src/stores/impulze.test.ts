import { createTestingPinia } from '@pinia/testing'
import { useImpulzeStore } from '../stores/impulze'

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
    expect(impulzeStore.activeImpulzes.includes(dummyImpulzes[0])).toBe(true)
  })

  it('should deactivate an impulze', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulze(dummyImpulzes[0])
    impulzeStore.activateImpulze(dummyImpulzes[1])
    impulzeStore.deactivateImpulze(dummyImpulzes[0])

    expect(impulzeStore.activeImpulzes.length).toBe(1)
    expect(impulzeStore.activeImpulzes.includes(dummyImpulzes[0])).toBe(false)
  })

  it('should activate all impulzes from array', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulzes(dummyImpulzes)

    expect(impulzeStore.activeImpulzes.length).toBe(dummyImpulzes.length)
    expect(impulzeStore.activeImpulzes.includes(dummyImpulzes[0])).toBe(true)
    expect(impulzeStore.activeImpulzes.includes(dummyImpulzes[1])).toBe(true)
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
    expect(impulzeStore.activeImpulzes.includes(dummyImpulzes[0])).toBe(true)
    expect(impulzeStore.activeImpulzes.includes(dummyImpulzes[1])).toBe(true)
  })

  it('should compute whether an impulze is active', () => {
    const impulzeStore = useImpulzeStore()

    impulzeStore.activateImpulze(dummyImpulzes[0])

    expect(impulzeStore.impulzeIsActive(dummyImpulzes[0])).toBe(true)
  })
})
