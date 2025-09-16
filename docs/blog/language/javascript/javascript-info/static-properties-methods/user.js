import { consola } from 'consola'

class User {
  static staticMethod() {
    consola.info(this === User)
  }
}

User.staticMethod() // true

// 实际上跟直接将其作为属性赋值的作用相同：
// class User {}

// User.staticMethod = function () {
//   alert(this === User)
// }

// User.staticMethod() // true
