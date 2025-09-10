import { consola } from 'consola'

const arr = [1, 2, 3]

consola.info(arr.__proto__ === Array.prototype) // true
consola.info(arr.__proto__.__proto__ === Object.prototype) // true
consola.info(arr.__proto__.__proto__.__proto__) // null

function f() {}

consola.info(f.__proto__ === Function.prototype) // true
consola.info(f.__proto__.__proto__ === Object.prototype) // true
consola.info(f.__proto__.__proto__.__proto__) // null
