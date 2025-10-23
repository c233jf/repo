import { consola } from 'consola'

// 新手常犯的一个经典错误：从技术上讲，我们也可以将多个 .then 添加到一个 promise 上。
// 但这并不是 promise 链（chaining）。

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

promise.then((result) => {
  consola.info(result)
  return result + 1
})

promise.then((result) => {
  consola.info(result)
  return result + 1
})

promise.then((result) => {
  consola.info(result)
  return result + 1
})
