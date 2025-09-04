import { consola } from 'consola'

const user = {
  name: 'John',
}

const descriptor = Object.getOwnPropertyDescriptor(user, 'name')

consola.info(descriptor) // { value: 'John', writable: true, enumerable: true, configurable: true }
