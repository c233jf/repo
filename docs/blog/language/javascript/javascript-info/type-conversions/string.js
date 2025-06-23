import { consola } from 'consola'

let value = true
consola.log(value, typeof value) // boolean

value = String(value) // 现在，值是一个字符串形式的 "true"
consola.log(value, typeof value) // string

let n = null
consola.log(n, typeof n) // object

n = String(n)
consola.log(n, typeof n) // string

let u = undefined
consola.log(u, typeof u) // undefined

u = String(u)
consola.log(u, typeof u) // string
