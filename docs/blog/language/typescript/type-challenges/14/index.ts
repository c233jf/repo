/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array

  ### 题目

  实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

  例如：

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // 应推导出 'a'
  type head2 = First<arr2> // 应推导出 3
  ```

  > 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/

/* _____________ 你的代码 _____________ */

type First<T extends unknown[]> = T extends [infer U, ...unknown[]] ? U : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

export type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

export type errors = [
  // @ts-expect-error 不符合 extends 约束
  First<'notArray'>,
  // @ts-expect-error 不符合 extends 约束
  First<{ 0: 'arrayLike' }>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/14/answer/zh-CN
  > 查看解答：https://tsch.js.org/14/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
