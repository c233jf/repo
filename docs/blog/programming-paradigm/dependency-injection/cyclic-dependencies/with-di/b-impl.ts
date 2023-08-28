import { A } from './a'

export interface Dependencies {
  a: A
}

export const makeB =
  ({ a }: Dependencies) =>
  (value: number) => {
    console.log('b', value)
    if (!value) return
    a(value - 1)
  }
