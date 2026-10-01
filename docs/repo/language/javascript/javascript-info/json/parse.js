import { consola } from 'consola'

// 字符串化数组
let numbers = '[0, 1, 2, 3]'

numbers = JSON.parse(numbers)

consola.log(numbers) // [0, 1, 2, 3]

// 字符串化对象
const userData =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }'

const user = JSON.parse(userData)

consola.log(user.friends[1]) // 1
