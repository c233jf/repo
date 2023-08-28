// 统一依赖注入
//#region makeFastRandomNumber1
export type RandomGenerator = () => number

export const makeFastRandomNumber1 =
  (randomGenerator: RandomGenerator) => (max: number) =>
    Math.floor(randomGenerator() * (max + 1))
//#endregion makeFastRandomNumber1

// 自动注入依赖
//#region makeFastRandomNumber
export interface Dependencies {
  randomGenerator: () => number
}

export const makeFastRandomNumber =
  ({ randomGenerator }: Dependencies) =>
  (max: number) =>
    Math.floor(randomGenerator() * (max + 1))
//#endregion makeFastRandomNumber
