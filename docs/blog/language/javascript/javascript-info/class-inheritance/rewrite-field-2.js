import { consola } from 'consola'

class Animal {
  constructor() {
    this.showName()
  }

  showName() {
    consola.info('animal')
  }
}

class Rabbit extends Animal {
  showName() {
    consola.info('rabbit')
  }
}

new Animal() // animal
new Rabbit() // rabbit
