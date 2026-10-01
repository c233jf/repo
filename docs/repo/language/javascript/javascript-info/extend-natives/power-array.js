import { consola } from 'consola'

// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0
  }
}

const arr = new PowerArray(1, 2, 3)
consola.info(arr.isEmpty()) // false

const filteredArr = arr.filter((item) => item >= 2)
consola.info(filteredArr) // [2, 3]
consola.info(filteredArr.isEmpty()) // false

consola.info(arr.constructor === PowerArray) // true
