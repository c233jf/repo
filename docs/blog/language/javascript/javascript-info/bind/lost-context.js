import { consola } from 'consola'

const user = {
  name: 'John',
  sayHi() {
    consola.log(`Hello, ${this.name}!`)
  },
}

setTimeout(user.sayHi, 1000) // Hello, undefined!
// 丢失了 user 上下文

// 解决方案 1：包装器
setTimeout(function () {
  user.sayHi()
}, 1000) // Hello, John!
// 相同但更简短的写法：
setTimeout(() => user.sayHi(), 1000) // Hello, John!
// 改方案有一个问题，如果 user 的值在 setTimeout 执行前被修改，那么 sayHi 会使用修改后的值。
// user = {
//   sayHi() {
//     alert('Another user in setTimeout!')
//   },
// }

// 解决方案 2：bind
setTimeout(user.sayHi.bind(user), 1000) // Hello, John!
// bind 会创建一个新函数，这个新函数的 this 指向 user，所以不会受到 user 的值被修改的影响。
