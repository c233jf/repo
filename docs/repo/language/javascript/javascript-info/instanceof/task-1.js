import { consola } from 'consola'

function A() {}
function B() {}

A.prototype = B.prototype = {}

const a = new A()
consola.info(a instanceof B) // true
