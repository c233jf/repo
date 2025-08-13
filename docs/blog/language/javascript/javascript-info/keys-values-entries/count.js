import { consola } from 'consola'

function count(obj) {
  return Object.keys(obj).length
}

const user = {
  name: 'John',
  age: 30,
}

consola.log(count(user)) // 2
