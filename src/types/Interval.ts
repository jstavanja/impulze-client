import { ImpulzeResponse } from './Impulze'

interface ImpulzeMetadata {
  intervalId: number
  msRemainingUntilNotificationTriggers: number
}

export interface ImpulzeResponseWithMetadata {
  impulze: ImpulzeResponse
  metadata: ImpulzeMetadata
}
