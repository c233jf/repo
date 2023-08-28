import { B } from './b'

export interface Dependencies {
  b: B
}

export const makeA =
  ({ b }: Dependencies) =>
  (value: number) => {
    console.log('a', value)
    if (!value) return
    b(value - 1)
  }
