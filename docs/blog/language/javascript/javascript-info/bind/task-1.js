import { consola } from 'consola'

function f() {
  consola.log(this)
}

const user = {
  g: f.bind(null),
}

user.g() // null
