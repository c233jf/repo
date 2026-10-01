import { consola } from 'consola'

class Thenable {
  constructor(num) {
    this.num = num
  }

  then(resolve) {
    consola.info(this.num)
    setTimeout(() => resolve(this.num * 2), 1000)
  }
}

new Promise((resolve) => {
  resolve(1)
})
  .then((result) => {
    return new Thenable(result)
  })
  .then(consola.info)
