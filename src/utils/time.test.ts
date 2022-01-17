import { convertMillisecondsToSeconds, convertMillisecondsToSplitUnits, convertMillisecondsToSplitUnitsObject, convertSecondsToMilliseconds, convertSplitUnitsToMilliseconds } from './time'
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

  describe('Time unit to milliseconds converter', () => {
    it('should correctly calculate time in milliseconds', () => {
      const hours = 1
      const minutes = 2
      const seconds = 3

      const expectedResult = ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000 // 3723

      expect(convertSplitUnitsToMilliseconds(hours, minutes, seconds)).toBe(expectedResult)
    })
  })

  describe('Milliseconds to multiple units object converter', () => {
    const hours = 1
    const minutes = 2
    const seconds = 3

    const milliseconds = ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000 // 3723

    const {
      hours: hoursResult,
      minutes: minutesResult,
      seconds: secondsResult
    } = convertMillisecondsToSplitUnitsObject(milliseconds)

    expect(hoursResult).toBe(hours)
    expect(minutesResult).toBe(minutes)
    expect(secondsResult).toBe(seconds)
  })

  describe('Milliseconds to multiple units converter', () => {
    it('should correctly use singular in hours', () => {
      expect(convertMillisecondsToSplitUnits(60 * 60 * 1000)).toBe('1 hour')
    })
    it('should correctly use plural in hours', () => {
      expect(convertMillisecondsToSplitUnits(2 * 60 * 60 * 1000)).toBe('2 hours')
    })

    it('should correctly use singular in minutes', () => {
      expect(convertMillisecondsToSplitUnits(60 * 1000)).toBe('1 minute')
    })
    it('should correctly use plural in minutes', () => {
      expect(convertMillisecondsToSplitUnits(2 * 60 * 1000)).toBe('2 minutes')
    })

    it('should correctly use singular in seconds', () => {
      expect(convertMillisecondsToSplitUnits(1000)).toBe('1 second')
    })
    it('should correctly use plural in seconds', () => {
      expect(convertMillisecondsToSplitUnits(2 * 1000)).toBe('2 seconds')
    })

    it('should correctly display h m s from milliseconds', () => {
      const hours = 1
      const minutes = 2
      const seconds = 3

      const milliseconds = ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000 // 3723

      expect(convertMillisecondsToSplitUnits(milliseconds)).toBe(`${hours} hour, ${minutes} minutes, ${seconds} seconds`)
    })

    it('should correctly display m s from milliseconds', () => {
      const minutes = 2
      const seconds = 3

      const milliseconds = ((minutes * 60) + seconds) * 1000

      expect(convertMillisecondsToSplitUnits(milliseconds)).toBe(`${minutes} minutes, ${seconds} seconds`)
    })

    it('should correctly display s from milliseconds', () => {
      const seconds = 3

      const milliseconds = seconds * 1000

      expect(convertMillisecondsToSplitUnits(milliseconds)).toBe(`${seconds} seconds`)
    })

    it('should correctly display h s from milliseconds', () => {
      const hours = 1
      const seconds = 3

      const milliseconds = ((hours * 60 * 60) + seconds) * 1000

      expect(convertMillisecondsToSplitUnits(milliseconds)).toBe(`${hours} hour, ${seconds} seconds`)
    })
  })
})
