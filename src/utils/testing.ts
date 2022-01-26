import { Impulze } from '../types/Impulze'
import { ImpulzeResponseWithMetadata } from '../types/Interval'
import { impulzesAreEqual } from './comparison'

export const activeImpulzeListContainsImpulzes = (activeImpulzes: ImpulzeResponseWithMetadata[], impulzes: Impulze[]) => {
  return impulzes.every(
    impulze => activeImpulzes.some(
      activeImpulze => impulzesAreEqual(activeImpulze.impulze, impulze)
    )
  )
}

export const activeImpulzeListContainsOnlyImpulzes = (activeImpulzes: ImpulzeResponseWithMetadata[], impulzes: Impulze[]) => {
  return activeImpulzes.every(
    activeImpulze => impulzes.some(
      impulze => impulzesAreEqual(activeImpulze.impulze, impulze)
    )
  )
}
