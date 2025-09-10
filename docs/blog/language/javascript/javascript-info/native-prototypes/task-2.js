import { consola } from 'consola'

Function.prototype.defer = function (ms) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const f = this
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms)
  }
}

function f(a, b) {
  consola.info(a + b)
}

f.defer(1000)(1, 2) // 3 (1秒后)

const user = {
  name: 'John',
  sayHi() {
    consola.info(this.name)
  },
}

user.sayHi = user.sayHi.defer(1000)

user.sayHi() // John (1秒后)
