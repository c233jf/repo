import { makeA } from './a-impl'
import { b } from './b'

export type A = (value: number) => void

export const a = makeA({ b })
