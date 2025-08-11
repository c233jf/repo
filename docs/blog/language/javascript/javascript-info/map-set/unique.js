import { consola } from 'consola'

function unique(arr) {
  // or Array.from(new Set(arr))
  return [...new Set(arr)]
}

const values = [
  'Hare',
  'Krishna',
  'Hare',
  'Krishna',
  'Krishna',
  'Krishna',
  'Hare',
  'Hare',
  ':-O',
]

consola.log(unique(values)) // Hare, Krishna, :-O
