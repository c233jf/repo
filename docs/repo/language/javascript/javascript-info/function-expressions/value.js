import { consola } from 'consola'

// 无论函数是如何创建的，函数都是一个值。
function sayHi() {
  consola.log('Hello')
}

consola.log(sayHi) // [Function: sayHi]

// 的确，在某种意义上说一个函数是一个特殊值，我们可以像 sayHi() 这样调用它。
// 但它依然是一个值，所以我们可以像使用其他类型的值一样使用它。
// 我们可以复制函数到其他变量：
let func = sayHi

func() // Hello
sayHi() // Hello
