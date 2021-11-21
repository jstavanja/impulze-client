import { convertMillisecondsToSeconds } from './time'
describe('time utilities', () => {
  describe('milliseconds to seconds converter', () => {
    it('should correctly calculate time in seconds', () => {
      const aSecondInMilliseconds = 1 * 1000

      expect(convertMillisecondsToSeconds(aSecondInMilliseconds)).toBe(1)
    })
  })
})
