import { consola } from 'consola'

const user = {
  sayHi() {
    // 被忽略
    alert('Hello')
  },
  [Symbol('id')]: 123, // 被忽略
  something: undefined, // 被忽略
}

consola.log(JSON.stringify(user)) // {}（空对象）
