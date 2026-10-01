import { consola } from 'consola'

function User(name) {
  this.name = name
}

const user = new User('John')
const user2 = new user.constructor('Jane')

consola.info(user.name) // John
consola.info(user2.name) // Jane

function User2(name) {
  this.name = name
}
User2.prototype = {} // (*)

const user3 = new User2('John')
const user4 = new user3.constructor('Pete')

consola.info(user3.name) // John
consola.info(user4.name) // Pete

// 首先，它在 user 中寻找 constructor。没找到。
// 然后它追溯原型链。user 的原型是 User.prototype，它也没有 constructor（因为我们“忘记”在右侧设定它了）。
// 再向上追溯，User.prototype 是一个普通对象 {}，其原型是 Object.prototype。
// 最终，对于内建的 Object.prototype，有一个内建的 Object.prototype.constructor == Object。所以就用它了。
