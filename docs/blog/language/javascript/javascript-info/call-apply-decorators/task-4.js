import { consola } from 'consola'

function f(a) {
  consola.log(a)
}

function throttle(f, ms) {
  let isThrottled = false
  let savedArgs
  let savedThis
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this
      return
    }
    isThrottled = true
    f.apply(this, arguments)
    setTimeout(() => {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }
  return wrapper
}

const f1000 = throttle(f, 1000)

f1000(1) // 显示 1
f1000(2) // (节流，尚未到 1000ms)
f1000(3) // (节流，尚未到 1000ms)

// 当 1000ms 时间到...
// ...输出 3，中间值 2 被忽略
