export interface Impulze {
  name: string
  description: string
  period: number
}

export interface ImpulzeResponse extends Impulze {
  _id: string;
}
