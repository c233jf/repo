const example = {
  a: 'a',
  getA() {
    console.log(this)
    console.log(this.a)
  },
}

example.getA() // { a: 'a', getA: [Function: getA] } 'a'

setTimeout(example.getA, 1000) // [object Window] undefined

// 在 setTimeout 中没有传递 thisArg 的选项，所以使用 call 设置 this 也没用。
setTimeout.call(example, example.getA, 1000) // [object Window] undefined
