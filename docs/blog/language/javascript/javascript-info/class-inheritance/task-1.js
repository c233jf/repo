import { consola } from 'consola'

class Animal {
  constructor(name) {
    this.name = name
  }
}

class Rabbit extends Animal {
  constructor(name) {
    super(name)
    this.created = Date.now()
  }
}

const rabbit = new Rabbit('White Rabbit')

consola.info(rabbit.name) // White Rabbit
consola.info(rabbit.created) // Date.now()
