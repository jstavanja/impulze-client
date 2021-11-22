import { Impulze } from '../types/Impulze'
import { impulzesAreEqual } from './comparison'

describe('Comparison utilities', () => {
  describe('Impulze equal testing utility', () => {
    it('should compute that two impulzes are equal', () => {
      const impulzeA: Impulze = {
        name: 'Test impulze #1',
        description: 'This is a testing impulze',
        period: 10000,
      }
      const impulzeB: Impulze = {
        name: 'Test impulze #1',
        description: 'This is a testing impulze',
        period: 10000,
      }

      expect(impulzesAreEqual(impulzeA, impulzeB)).toBe(true)
    })

    it('should compute that two impulzes are not equal', () => {
      const impulzeA: Impulze = {
        name: 'Test impulze #1',
        description: 'This is a testing impulze',
        period: 10000,
      }
      const impulzeB: Impulze = {
        name: 'Test impulze #2',
        description: 'This is another testing impulze',
        period: 5000,
      }

      expect(impulzesAreEqual(impulzeA, impulzeB)).toBe(false)
    })
  })
})
