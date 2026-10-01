import { consola } from 'consola'

class Rabbit {}

const rabbit = new Rabbit()

consola.info(rabbit instanceof Rabbit) // true
