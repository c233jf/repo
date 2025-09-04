import { consola } from 'consola'

const user = {}

Object.defineProperty(user, 'name', {
  value: 'John',
  // 对于新属性，我们需要明确地列出哪些是 true
  enumerable: true,
  configurable: true,
})

consola.info(user.name) // John
user.name = 'Jane' // Error: Cannot assign to read only property 'name'
