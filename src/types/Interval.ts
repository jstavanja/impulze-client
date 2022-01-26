import { Ref } from 'vue'
import { ImpulzeResponse } from './Impulze'

interface ImpulzeMetadata {
  intervalId: number
  msRemainingUntilNotificationTriggers: Ref<number>
}

export interface ImpulzeResponseWithMetadata {
  impulze: ImpulzeResponse
  metadata: ImpulzeMetadata
}
