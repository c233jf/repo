import { consola } from 'consola'

function partial(func, ...argsBound) {
  return function (...args) {
    return func.call(this, ...argsBound, ...args)
  }
}

const user = {
  firstName: 'John',
  say(time, phrase) {
    consola.log(`[${time}] ${this.firstName}: ${phrase}!`)
  },
}

user.sayNow = partial(
  user.say,
  new Date().getHours() + ':' + new Date().getMinutes(),
)

user.sayNow('Hello') // [6:56] John: Hello!
// lodash 库提供类似的函数 _.partial(func, ...argsBound)。
