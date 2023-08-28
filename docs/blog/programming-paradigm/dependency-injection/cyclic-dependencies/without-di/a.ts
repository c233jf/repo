import { b } from './b'

export const a = (value: number) => {
  console.log('a', value)
  if (!value) return
  b(value - 1)
}
