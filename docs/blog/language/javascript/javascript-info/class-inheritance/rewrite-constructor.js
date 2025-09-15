import { consola } from 'consola'

import { Animal } from './animal.js'

export class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name)
    this.earLength = earLength
  }

  hide() {
    consola.info(`${this.name} hides!`)
  }
}

const rabbit = new Rabbit('White Rabbit', 10)

consola.info(rabbit.name) // White Rabbit
consola.info(rabbit.earLength) // 10
