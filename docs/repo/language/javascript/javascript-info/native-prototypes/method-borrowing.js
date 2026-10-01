import { consola } from 'consola'

const obj = {
  0: 'Hello',
  1: 'World',
  length: 2,
}

obj.join = Array.prototype.join

consola.info(obj.join(' ')) // Hello World
