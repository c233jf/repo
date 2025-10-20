import { consola } from 'consola'

const promise = new Promise((resolve) => {
  resolve(1)

  setTimeout(() => {
    resolve(2)
  }, 1000)
})

promise.then(consola.info) // 1
