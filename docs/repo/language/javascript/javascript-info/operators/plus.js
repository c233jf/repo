import { consola } from 'consola'

// 如果 + 号被应用于字符串，它将合并（连接）各个字符串
consola.log('my' + 'string') // "mystring"

// 注意：只要有一个操作数是字符串，另一个操作数也会被转换为字符串。
consola.log(1 + '2') // "12"
consola.log(2 + '1') // "21"
consola.log(2 + 2 + '1') // "41" 而不是 "221"
consola.log('1' + 2 + 2) // "122" 而不是 "14"

// 二元 + 是唯一一个以这种方式支持字符串的运算符。其他算术运算符只对数字起作用，并且总是将其运算元转换为数字。
consola.log(6 - '2') // 4
consola.log('6' / '2') // 3

// 一元 + 运算符
// 一元 + 运算符把操作数转换为数字并返回转换后的数字。
consola.log(+true) // 1
consola.log(+'') // 0

// 它的效果和 Number(...) 相同，但是更加简短。
