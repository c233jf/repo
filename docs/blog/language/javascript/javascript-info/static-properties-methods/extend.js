import { consola } from 'consola'

class Animal {
  static planet = 'Earth'

  constructor(name, speed) {
    this.speed = speed
    this.name = name
  }

  run(speed = 0) {
    this.speed += speed
    consola.info(`${this.name} runs with speed ${this.speed}`)
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed
  }
}

class Rabbit extends Animal {
  hide() {
    consola.info(`${this.name} hides!`)
  }
}

const rabbits = [new Rabbit('White Rabbit', 10), new Rabbit('Black Rabbit', 5)]

rabbits.sort(Rabbit.compare)

rabbits[0].run() // Black Rabbit runs with speed 10
consola.info(Rabbit.planet) // Earth

consola.info(Rabbit.__proto__ === Animal) // true
consola.info(Rabbit.prototype.__proto__ === Animal.prototype) // true
