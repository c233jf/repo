import { consola } from 'consola'

let num = 1.23456

consola.log(Math.round(num * 100) / 100) // 1.23

let num2 = 12.34

consola.log(num2.toFixed(1)) // 12.3

let num3 = 12.36

consola.log(num3.toFixed(1)) // 12.4

let num4 = 12.34

consola.log(num4.toFixed(5)) // 12.34000
