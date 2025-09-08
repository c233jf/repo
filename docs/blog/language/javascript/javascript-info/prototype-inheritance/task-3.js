import { consola } from 'consola'

const animal = {
  eat() {
    this.full = true
  },
}

const rabbit = {
  __proto__: animal,
}

rabbit.eat()
consola.info(rabbit.full) // true
consola.info(animal.full) // undefined
