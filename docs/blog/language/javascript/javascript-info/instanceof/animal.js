import { consola } from 'consola'

class Animal {
  static [Symbol.hasInstance](instance) {
    return instance.canEat
  }
}

const dog = {
  canEat: true,
}

consola.info(dog instanceof Animal) // true：Animal[Symbol.hasInstance](obj) 被调用
