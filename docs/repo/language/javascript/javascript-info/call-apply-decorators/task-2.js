import { consola } from 'consola'

function f(x) {
  consola.log(x)
}

function delay(f, ms) {
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms)
  }
}

const f1000 = delay(f, 1000)
const f1500 = delay(f, 1500)

f1000('test') // (1秒后) test
f1500('test') // (1.5秒后) test
