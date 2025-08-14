import { consola } from 'consola'

const user = {
  name: 'John',
  years: 30,
}

const { name, years: age, isAdmin = false } = user

consola.log(name, age, isAdmin) // John 30 false
