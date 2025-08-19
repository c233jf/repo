import { consola } from 'consola'

function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2)
}

consola.log(fib(3)) // 2
consola.log(fib(7)) // 13
// consola.log(fib(77)) // 5527939700884757 超级慢

function fib2(n) {
  let a = 1
  let b = 1
  for (let i = 3; i <= n; i++) {
    const c = a + b
    a = b
    b = c
  }
  return b
}

consola.log(fib2(3)) // 2
consola.log(fib2(7)) // 13
consola.log(fib2(77)) // 5527939700884757
