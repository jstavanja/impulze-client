import { Impulze } from '../types/Impulze'
import { ImpulzeResponseWithInterval } from '../types/Interval'
import { impulzesAreEqual } from './comparison'

export const activeImpulzeListContainsImpulzes = (activeImpulzes: ImpulzeResponseWithInterval[], impulzes: Impulze[]) => {
  return impulzes.every(
    impulze => activeImpulzes.some(
      activeImpulze => impulzesAreEqual(activeImpulze.impulze, impulze)
    )
  )
}

export const activeImpulzeListContainsOnlyImpulzes = (activeImpulzes: ImpulzeResponseWithInterval[], impulzes: Impulze[]) => {
  return activeImpulzes.every(
    activeImpulze => impulzes.some(
      impulze => impulzesAreEqual(activeImpulze.impulze, impulze)
    )
  )
}
