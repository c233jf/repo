import { consola } from 'consola'

consola.log(JSON.stringify(1)) // 1

consola.log(JSON.stringify('Hello')) // "Hello"

consola.log(JSON.stringify(true)) // true

consola.log(JSON.stringify(false)) // false

consola.log(JSON.stringify(null)) // null

consola.log(JSON.stringify(undefined)) // undefined

consola.log(JSON.stringify([1, 2, 3]))
