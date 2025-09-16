import { consola } from 'consola'

class Rabbit extends Object {
  constructor(name) {
    super()
    this.name = name
  }
}

const rabbit = new Rabbit('Rabbit')
// eslint-disable-next-line no-prototype-builtins
consola.info(rabbit.hasOwnProperty('name')) // true
