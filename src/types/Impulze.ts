export interface Impulze {
  name: string
  description: string
  period: number
}

export interface ImpulzeResponse extends Impulze {
  id: number;
}
