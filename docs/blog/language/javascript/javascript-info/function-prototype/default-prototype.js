import { consola } from 'consola'

function Rabbit() {}
// 默认：
// Rabbit.prototype = { constructor: Rabbit }

consola.info(Rabbit.prototype.constructor === Rabbit) // true
