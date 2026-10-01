import { consola } from 'consola'

const animal = {
  jumps: null,
}

const rabbit = {
  __proto__: animal,
  jumps: true,
}

consola.info(rabbit.jumps) // true
delete rabbit.jumps
consola.info(rabbit.jumps) // null
delete animal.jumps
consola.info(rabbit.jumps) // undefined
