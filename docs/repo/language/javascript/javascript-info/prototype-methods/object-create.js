import { consola } from 'consola'

const animal = {
  eats: true,
}

// 创建一个以 animal 为原型的新对象
const rabbit = Object.create(animal) // 与 {__proto__: animal} 相同

consola.info(rabbit.eats) // true

consola.info(Object.getPrototypeOf(rabbit) === animal) // true

Object.setPrototypeOf(rabbit, {}) // 将 rabbit 的原型修改为 {}
