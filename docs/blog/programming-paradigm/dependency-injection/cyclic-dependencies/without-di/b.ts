import { a } from './a'

export const b = (value: number) => {
  console.log('b', value)
  if (!value) return
  a(value - 1)
}
