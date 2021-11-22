import { Impulze } from '../types/Impulze'

export const impulzesAreEqual = (impulzeA: Impulze, impulzeB: Impulze) => {
  return (
    impulzeA.name === impulzeB.name
  ) && (
    impulzeA.description === impulzeB.description
  ) && (
    impulzeA.period === impulzeB.period
  )
}
