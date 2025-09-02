import { consola } from 'consola'

function mul(a, b) {
  return a * b
}

const double = mul.bind(null, 2)

consola.log(double(3)) // 6
consola.log(double(4)) // 8

const triple = mul.bind(null, 3)

consola.log(triple(3)) // 9
consola.log(triple(4)) // 12
