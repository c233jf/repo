import { consola } from 'consola'

function printNumbers(from, to) {
  let current = from

  function tick() {
    consola.log(current)
    if (current === to) {
      clearInterval(timerId)
    }
    current++
  }

  tick()
  let timerId = setInterval(tick, 1000)
}

printNumbers(1, 10)
