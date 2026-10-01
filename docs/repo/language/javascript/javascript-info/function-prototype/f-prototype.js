import { consola } from 'consola'

const animal = {
  eats: true,
}

function Rabbit(name) {
  this.name = name
}

Rabbit.prototype = animal

const rabbit = new Rabbit('White Rabbit') // rabbit.__proto__ == animal

consola.info(rabbit.eats) // true
