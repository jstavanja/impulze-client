import { ImpulzeResponseWithInterval } from '../types/Interval'
import { activeImpulzeListContainsImpulzes, activeImpulzeListContainsOnlyImpulzes } from './testing'

const impulzeList = [
  {
    id: 1,
    name: 'Test impulze #1',
    description: 'This is a testing impulze',
    period: 10000,
  },
  {
    id: 2,
    name: 'Test impulze #2',
    description: 'This is another testing impulze',
    period: 5000,
  },
]

const activeImpulzeList: ImpulzeResponseWithInterval[] = [
  {
    impulze: impulzeList[0],
    intervalId: 1
  },
  {
    impulze: impulzeList[1],
    intervalId: 2
  }
]

const anotherImpulzeWithInterval: ImpulzeResponseWithInterval = {
  impulze: {
    id: 3,
    name: 'Test impulze #3',
    description: 'This is yet another testing impulze',
    period: 70000,
  },
  intervalId: 3
}

describe('Testing utilities', () => {
  describe('activeImpulzeListContainsImpulzes', () => {
    it('should compute that all of the items in the impulzes list are also in the activeImpulzes list', () => {
      expect(activeImpulzeListContainsImpulzes(activeImpulzeList, impulzeList)).toBe(true)
    })

    it('should compute that the items in the impulzes list are not in the activeImpulzes list', () => {
      expect(activeImpulzeListContainsImpulzes([], impulzeList)).toBe(false)
    })
  })

  describe('activeImpulzeListContainsOnlyImpulzes', () => {
    it('should compute that ONLY all of the items in the impulzes list are also in the activeImpulzes list', () => {
      expect(activeImpulzeListContainsOnlyImpulzes(activeImpulzeList, impulzeList)).toBe(true)
    })

    it('should compute that not ONLY the items in the impulzes list are in the activeImpulzes list', () => {
      expect(activeImpulzeListContainsOnlyImpulzes([...activeImpulzeList, anotherImpulzeWithInterval], impulzeList)).toBe(false)
    })
  })
})
