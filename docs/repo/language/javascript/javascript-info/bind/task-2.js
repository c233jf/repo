import { consola } from 'consola'

function f() {
  consola.log(this)
}

// eslint-disable-next-line no-func-assign
f = f.bind({ name: 'John' }).bind({ name: 'Pete' })

f() // { name: 'John' }
// 一个函数不能被重绑定（re-bound），需要注意的是，这里指的是 this 不能被重绑定，但是函数的参数可以被重绑定。
