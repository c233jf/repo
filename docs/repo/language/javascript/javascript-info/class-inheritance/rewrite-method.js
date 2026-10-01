import { consola } from 'consola'

import { Animal } from './animal.js'

export class Rabbit extends Animal {
  hide() {
    consola.info(`${this.name} hides!`)
  }

  stop() {
    super.stop()
    this.hide()
  }
}

const rabbit = new Rabbit('White Rabbit')

rabbit.run(5) // White Rabbit runs with speed 5
rabbit.stop() // White Rabbit stands still White Rabbit hides!
