import { consola } from 'consola'

class User {
  constructor(name) {
    this.name = name
  }

  get name() {
    return this._name
  }

  set name(value) {
    if (value.length < 4) {
      consola.error('Name must be at least 4 characters long')
      return
    }
    this._name = value
  }
}

const user = new User('John')
consola.info(user.name) // John

user.name = 'J'
consola.info(user.name) // John
