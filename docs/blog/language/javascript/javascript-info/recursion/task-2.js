import { consola } from 'consola'

function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1)
}

consola.log(factorial(5)) // 120
