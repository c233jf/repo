import { consola } from 'consola'

new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
  .then((result) => {
    consola.info(result)
    return result + 1
  })
  .then((result) => {
    consola.info(result)
    return result + 1
  })
