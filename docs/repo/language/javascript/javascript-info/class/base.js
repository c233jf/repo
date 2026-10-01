import { consola } from 'consola'

class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    consola.info(this.name)
  }
}

const user = new User('John')
user.sayHi() // John

// class 是一个函数
consola.info(typeof User) // function
// ...或者，更确切地说，是 constructor 方法
consola.info(User === User.prototype.constructor) // true
// 方法在 User.prototype 中，例如：
consola.info(User.prototype.sayHi) // [Function: sayHi]
// 在原型中实际上有两个方法
consola.info(Object.getOwnPropertyNames(User.prototype)) // [ 'constructor', 'sayHi' ]

// User() // TypeError: Class constructor User cannot be invoked without 'new'
consola.info(User) // [class User]
