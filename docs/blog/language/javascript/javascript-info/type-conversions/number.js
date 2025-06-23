import { consola } from 'consola'

let value = '6' / '2'
consola.log(value, typeof value) // 3，string 类型的值被自动转换成 number 类型后进行计算

// 使用 Number() 进行显式转换
let str = '123'
consola.log(typeof str) // string

let num = Number(str)
consola.log(num, typeof num) // 123，number

// 当我们从 string 类型源（如文本表单）中读取一个值，但期望输入一个数字时，通常需要进行显式转换。
// 如果该字符串不是一个有效的数字，转换的结果会是 NaN。
let age = Number('an arbitrary string instead of a number')
consola.log(age, typeof age) // NaN，number

// Number 类型转换规则
// 1. string -> 去掉首尾空白字符（空格、换行符 \n、制表符 \t 等）后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN。
// 2. null -> 0
// 3. undefined -> NaN
// 4. true -> 1
// 6. false -> 0

consola.log(Number(' 123 ')) // 123
consola.log(Number('123a')) // NaN
consola.log(Number('')) // 0
consola.log(Number('  ')) // 0

consola.log(Number(null)) // 0
consola.log(Number(undefined)) // NaN
consola.log(Number(true)) // 1
consola.log(Number(false)) // 0
