/*
  7 - 对象属性只读
  -------
  by Anthony Fu (@antfu) #简单 #built-in #readonly #object-keys

  ### 题目

  不要使用内置的`Readonly<T>`，自己实现一个。

  泛型 `Readonly<T>` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。

  也就是不可以再对该对象的属性赋值。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > 在 Github 上查看：https://tsch.js.org/7/zh-CN
*/

/* _____________ 你的代码 _____________ */

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

export type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/7/answer/zh-CN
  > 查看解答：https://tsch.js.org/7/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
