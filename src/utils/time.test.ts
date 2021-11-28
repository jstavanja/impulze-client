import { convertMillisecondsToSeconds, convertSecondsToMilliseconds } from './time'
describe('Time utilities', () => {
  describe('Milliseconds to seconds converter', () => {
    it('should correctly calculate time in seconds', () => {
      const aSecondInMilliseconds = 1 * 1000

      expect(convertMillisecondsToSeconds(aSecondInMilliseconds)).toBe(1)
    })
  })

  describe('Seconds to milliseconds converter', () => {
    it('should correctly calculate time in milliseconds', () => {
      const seconds = 10

      expect(convertSecondsToMilliseconds(seconds)).toBe(10000)
    })
  })
})
