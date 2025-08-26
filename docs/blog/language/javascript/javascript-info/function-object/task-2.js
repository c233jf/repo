import { consola } from 'consola'

function sum(a) {
  let currentSum = a

  function f(b) {
    currentSum += b
    return f
  }

  f.toString = () => currentSum

  return f
}

consola.log(+sum(1)(2)) // 3
consola.log(+sum(5)(-1)(2)) // 6
consola.log(+sum(6)(-1)(-2)(-3)) // 0
consola.log(+sum(0)(1)(2)(3)(4)(5)) // 15
