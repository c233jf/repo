import { consola } from 'consola'

const obj = {}

consola.info(obj.toString()) // [object Object]
consola.info(obj.__proto__ === Object.prototype) // true
consola.info(obj.toString === obj.__proto__.toString) // true
consola.info(obj.toString === Object.prototype.toString) // true
consola.info(Object.prototype.__proto__) // null
