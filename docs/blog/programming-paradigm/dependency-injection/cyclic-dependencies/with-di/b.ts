import { makeB } from './b-impl'
import { a } from './a'

export type B = (value: number) => void

export const b = makeB({ a })
