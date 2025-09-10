import { consola } from 'consola'

Function.prototype.defer = function (ms) {
  setTimeout(this, ms)
}

function f() {
  consola.info('Hello!')
}

f.defer(1000) // Hello! (1秒后)
