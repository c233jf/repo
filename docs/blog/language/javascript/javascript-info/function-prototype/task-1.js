import { consola } from 'consola'

function Rabbit() {}
Rabbit.prototype = {
  eats: true,
}

const rabbit = new Rabbit()

consola.info(rabbit.eats) // true

Rabbit.prototype = {}

consola.info(rabbit.eats) // true

const rabbit2 = new Rabbit()

Rabbit.prototype.eats = false

consola.info(rabbit2.eats) // false

delete rabbit.eats

consola.info(rabbit2.eats) // false

delete Rabbit.prototype.eats

consola.info(rabbit2.eats) // undefined
