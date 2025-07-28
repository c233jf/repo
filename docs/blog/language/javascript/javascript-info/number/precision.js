import { consola } from 'consola'

// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
consola.log(1e500) // Infinity

consola.log(0.1 + 0.2 === 0.3) // false

consola.log(0.1 + 0.2) // 0.30000000000000004

consola.log((0.1).toFixed(20)) // 0.10000000000000000555

let sum = 0.1 + 0.2

consola.log(sum.toFixed(2)) // 0.30

consola.log(+sum.toFixed(2) === 0.3) // true

consola.log((0.1 * 10 + 0.2 * 10) / 10) // 0.3
consola.log((0.28 * 100 + 0.14 * 100) / 100) // 0.4200000000000001
