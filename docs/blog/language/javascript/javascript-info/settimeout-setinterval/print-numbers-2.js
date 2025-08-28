import { consola } from 'consola'

function printNumbers(from, to) {
  let current = from
  setTimeout(function tick() {
    consola.log(current)
    if (current < to) {
      setTimeout(tick, 1000)
    }
    current++
  }, 1000)
}

printNumbers(1, 10)
