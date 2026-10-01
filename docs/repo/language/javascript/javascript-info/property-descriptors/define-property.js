import { consola } from 'consola'

const user = {}

Object.defineProperty(user, 'name', {
  value: 'Jane',
})

consola.info(Object.getOwnPropertyDescriptor(user, 'name')) // { value: 'Jane', writable: false, enumerable: false, configurable: false }
