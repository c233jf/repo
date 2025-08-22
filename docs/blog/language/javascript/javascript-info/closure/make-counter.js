import { consola } from 'consola'

function makeCounter() {
  let count = 0

  return function () {
    return count++
  }
}

const counter = makeCounter()
const counter2 = makeCounter()

consola.log(counter())
consola.log(counter())

consola.log(counter2())
consola.log(counter2())
