import { consola } from 'consola'

const dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join()
    },
  },
})

dictionary.apple = 'Apple'
dictionary.__proto__ = 'test' // 这里 __proto__ 是一个常规的属性键

for (const key in dictionary) {
  consola.info(key)
}

consola.info(dictionary.toString())
