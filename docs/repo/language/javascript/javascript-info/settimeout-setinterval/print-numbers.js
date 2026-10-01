import { consola } from 'consola'

function printNumbers(from, to) {
  let current = from
  let timerId = setInterval(() => {
    consola.log(current)
    if (current === to) {
      clearInterval(timerId)
    }
    current++
  }, 1000)
}

printNumbers(1, 10)
