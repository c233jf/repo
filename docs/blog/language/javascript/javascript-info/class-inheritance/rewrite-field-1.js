import { consola } from 'consola'

class Animal {
  name = 'animal'

  constructor() {
    consola.info(this.name)
  }
}

class Rabbit extends Animal {
  name = 'rabbit'
}

new Animal() // animal
new Rabbit() // animal
