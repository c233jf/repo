import { consola } from 'consola'

const user = {
  name: 'John Smith',
  age: 35,
}

const user2 = JSON.parse(JSON.stringify(user))

consola.log(user2) // { name: 'John Smith', age: 35 }
