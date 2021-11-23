import { Impulze } from './Impulze'

export interface ImpulzeWithInterval {
  impulze: Impulze
  intervalId: ReturnType<typeof setInterval>
}
