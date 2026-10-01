import { consola } from 'consola'

let name = 'John'

function sayHi() {
  consola.log(`Hi, ${name}`)
}

name = 'Pete'

sayHi()
