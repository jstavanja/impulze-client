const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60

export const convertMillisecondsToSeconds = (milliseconds: number) => {
  return milliseconds / 1000
}

export const convertSecondsToMilliseconds = (seconds: number) => {
  return seconds * 1000
}

export const convertSplitUnitsToMilliseconds = (hours: number, minutes: number, seconds: number) => {
  return ((hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE) + (minutes * SECONDS_IN_MINUTE) + seconds) * 1000
}

export const convertMillisecondsToSplitUnitsObject = (milliseconds: number) => {
  const date = new Date(milliseconds)

  const utcHours = date.getUTCHours()
  const utcMinutes = date.getUTCMinutes()
  const utcSeconds = date.getUTCSeconds()

  return {
    hours: utcHours,
    minutes: utcMinutes,
    seconds: utcSeconds,
  }
}

export const convertMillisecondsToSplitUnits = (milliseconds: number) => {
  const {
    hours: utcHours,
    minutes: utcMinutes,
    seconds: utcSeconds
  } = convertMillisecondsToSplitUnitsObject(milliseconds)

  let str = ''

  if (utcHours !== 0) {
    if (utcHours === 1) {
      str += utcHours + ' hour, '
    } else {
      str += utcHours + ' hours, '
    }
  }
  if (utcMinutes !== 0) {
    if (utcMinutes === 1) {
      str += utcMinutes + ' minute, '
    } else {
      str += utcMinutes + ' minutes, '
    }
  }
  if (utcSeconds !== 0) {
    if (utcSeconds === 1) {
      str += utcSeconds + ' second, '
    } else {
      str += utcSeconds + ' seconds, '
    }
  }

  str = str.slice(0, str.length - 2)

  return str
}
