import { consola } from 'consola'

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0
  }

  // 内建方法将使用这个作为 constructor
  static get [Symbol.species]() {
    return Array
  }
}

const arr = new PowerArray(1, 2, 3)
consola.info(arr.isEmpty()) // false

// filter 使用 arr.constructor[Symbol.species] 作为 constructor 创建新数组
const filteredArr = arr.filter((item) => item >= 2)

// filteredArr 不是 PowerArray，而是 Array
consola.info(filteredArr.isEmpty()) // TypeError: filteredArr.isEmpty is not a function
