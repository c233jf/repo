import { consola } from 'consola'

function sum(a) {
  return function (b) {
    return a + b
  }
}

consola.log(sum(1)(2))
consola.log(sum(5)(-1))
