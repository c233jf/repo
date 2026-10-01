import { consola } from 'consola'

function sumTo(n) {
  if (n === 1) return 1
  return n + sumTo(n - 1)
}

consola.log(sumTo(100)) // 5050
// consola.log(sumTo(100000)) // RangeError: Maximum call stack size exceeded

function sumTo2(n) {
  return (n * (n + 1)) / 2
}

consola.log(sumTo2(100)) // 5050

function sumTo3(n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

consola.log(sumTo3(100)) // 5050
