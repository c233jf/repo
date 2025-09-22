import { consola } from 'consola'

const sayMixin = {
  say(phrase) {
    consola.info(phrase)
  },
}

const sayHiMixin = {
  __proto__: sayMixin, // (或者，我们可以在这儿使用 Object.setPrototypeOf 来设置原型)
  sayHi() {
    super.say(`Hello, ${this.name}`)
  },
  sayBye() {
    super.say(`Bye, ${this.name}`)
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
