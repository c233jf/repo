import { consola } from 'consola'

function sayHi() {
  consola.log(this.name)
}
sayHi.test = 5

const bound = sayHi.bind({ name: 'John' })
consola.log(bound.test) // undefined
// bind 的结果是另一个对象。它并没有 test 属性。
