import { consola } from 'consola'

const sayHiMixin = {
  sayHi() {
    consola.info(`Hello, ${this.name}`)
  },
  sayBye() {
    consola.info(`Bye, ${this.name}`)
  },
}

class User {
  constructor(name) {
    this.name = name
  }
}

Object.assign(User.prototype, sayHiMixin)

const user = new User('John')
user.sayHi() // Hello, John
user.sayBye() // Bye, John
