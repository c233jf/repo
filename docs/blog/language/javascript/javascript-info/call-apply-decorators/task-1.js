import { consola } from 'consola'

function work(a, b) {
  consola.log(a + b) // work 是一个任意的函数或方法
}

function spy(func) {
  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args)
    return func.apply(this, args)
  }
  wrapper.calls = []
  return wrapper
}

// eslint-disable-next-line no-func-assign
work = spy(work)

work(1, 2) // 3
work(4, 5) // 9

for (let args of work.calls) {
  consola.log('call:' + args.join()) // "call:1,2", "call:4,5"
}
