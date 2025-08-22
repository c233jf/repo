import { consola } from 'consola'

function Counter() {
  let count = 0

  this.up = function () {
    return ++count
  }

  this.down = function () {
    return --count
  }
}

const counter = new Counter()

consola.log(counter.up())
consola.log(counter.up())
consola.log(counter.down())
