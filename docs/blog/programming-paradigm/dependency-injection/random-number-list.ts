import { randomNumber2, randomNumber3 } from './'

// randomNumber参数化
//#region randomNumberList1
export const randomNumberList1 = (max: number, length: number) =>
  Array(length)
    .fill(null)
    .map(() => randomNumber2(Math.random, max))
//#endregion randomNumberList1

// 区分构建与使用
//#region randomNumberList2
export const randomNumberList2 = (max: number, length: number) =>
  Array(length)
    .fill(null)
    .map(() => randomNumber3(max))
//#endregion randomNumberList2

// 统一依赖注入
//#region makeRandomNumberList1
export type RandomNumber = (max: number) => number

export const makeRandomNumberList1 =
  (randomNumber: RandomNumber) => (max: number, length: number) =>
    Array(length)
      .fill(null)
      .map(() => randomNumber(max))
//#endregion makeRandomNumberList1

// 自动依赖注入容器, 保证依赖顺序正确
//#region makeRandomNumberList
export interface Dependencies {
  randomNumber: (max: number) => number
}

export const makeRandomNumberList =
  ({ randomNumber }: Dependencies) =>
  (max: number, length: number) =>
    Array(length)
      .fill(null)
      .map(() => randomNumber(max))
//#endregion makeRandomNumberList
