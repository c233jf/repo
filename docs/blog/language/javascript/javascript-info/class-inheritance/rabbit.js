import { consola } from 'consola'

import { Animal } from './animal.js'

export class Rabbit extends Animal {
  hide() {
    consola.info(`${this.name} hides!`)
  }
}

const rabbit = new Rabbit('White Rabbit')

rabbit.run(5) // White Rabbit runs with speed 5
rabbit.hide() // White Rabbit hides!
