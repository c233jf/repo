// 来源: https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/256.%E7%B2%BE%E8%AF%BB%E3%80%8A%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%AE%80%E4%BB%8B%E3%80%8B.md
// 总的来说, 依赖注入由以下两部分组成:
//    1.参数化函数/类内部硬编码的依赖, 这样我们能有更高程度的控制, 并且这种方式会带来更好的测试性与可维护性(本质)
//    2.创建一个已经注入依赖的版本, 这样我们可以分发给那些不需要关心内部构建的用户
// 下面以一个函数实现是随机函数为例子进行说明

// 假设我们有以下函数
//#region randomNumber1
export const randomNumber1 = (max: number) =>
  Math.floor(Math.random() * (max + 1))
//#endregion randomNumber1

// 由于函数返回值是随机的, 显然无法做单测
// 方法1: 把 Math.random 函数提取到参数里
//#region randomNumber2
export type RandomGenerator = () => number

export const randomNumber2 = (randomGenerator: RandomGenerator, max: number) =>
  Math.floor(randomGenerator() * (max + 1))
//#endregion randomNumber2

// 缺点: 破坏了函数本身接口, 降低了易用性, 而且如果已经有人使用这个函数, 这将会是一个 BREAKING CHANGES
// 我们可以看一下 randomNumberList1, 之前使用 randomNumber 的用户不需要关心 randomGenerator 实现, 甚至不会注意到它的存在
// 因为实现细节被有意封装在 randomNumber 内部. 现在, 因为randomGenerator被暴露出来, 用户需要负责提供 randomGenerator,
// 这意味着他们更有可能被 randomNumber 内部的更改所影响. 例如, 我们决定更改 randomGenerator 的接口

// 方法2: 区分构建与使用
//#region randomNumber3
export const randomNumberImplementation = (
  randomGenerator: RandomGenerator,
  max: number
) => Math.floor(randomGenerator() * (max + 1))

export const randomNumber3 = (max: number) =>
  randomNumberImplementation(Math.random, max)
//#endregion randomNumber3

// 缺点: 依赖与原始参数混合一起, 导致 randomNumber 的参数不得不传递给内部构建的 randomNumber 版本

// 方法3: 工厂函数模式
//#region randomNumber4
export const makeRandomNumber =
  (randomGenerator: RandomGenerator) => (max: number) =>
    Math.floor(randomGenerator() * (max + 1))

export const randomNumber4 = makeRandomNumber(Math.random)
//#endregion randomNumber4

// 缺点: 代码中同时存在构建和使用, 这样职责不清晰, 而且因为每个文件都要提前引用依赖, 依赖间容易形成循环引用, 即便从具体函数层面看, 并没有发生函数间的循环引用

// 方法4: 统一依赖注入入口
//#region randomNumber
import { secureRandomNumber } from './secure-random-number'
import { makeFastRandomNumber1 } from './fast-random-number'
import { makeRandomNumberList1 } from './random-number-list'

const randomGenerator = Math.random
const fastRandomNumber = makeFastRandomNumber1(randomGenerator)
const randomNumber =
  process.env.NODE_ENV === 'production' ? secureRandomNumber : fastRandomNumber
const randomNumberList = makeRandomNumberList1(randomNumber)

export const container1 = {
  randomNumber,
  randomNumberList,
}

export type Container1 = typeof container1
//#endregion randomNumber

// 缺点: 统一注入的入口代码要随着业务文件的变化而变化, 同时, 如果构造函数之间存在复杂的依赖链条, 手动维护起顺序将是一件越来越复杂的事情：
// 比如 A 依赖 B, B 依赖 C, 那么想要初始化 C 的构造函数, 就要先初始化 A 再初始化 B, 最后初始化 C

// 方法5: 自动依赖注入容器, 保证依赖顺序正确
//#region auto-di
import { makeFastRandomNumber } from './fast-random-number'
import { makeRandomNumberList } from './random-number-list'

const dependenciesFactories = {
  randomNumber:
    process.env.NODE_ENV === 'production'
      ? () => secureRandomNumber
      : makeFastRandomNumber,
  randomNumberList: makeRandomNumberList,
  randomGenerator: () => Math.random,
}

type DependenciesFactories = typeof dependenciesFactories

export type Container = {
  [p in keyof DependenciesFactories]: ReturnType<DependenciesFactories[p]>
}

export const container = {} as Container

Object.entries(dependenciesFactories).forEach(([dependencyName, factory]) => {
  Object.defineProperty(container, dependencyName, {
    // 这里使用 getter 避免立即执行
    // 工厂函数, 不然执行的时候如果有
    // 依赖为 undefined 会报错
    // 这种方式, 工厂函数只能在整个 container
    // 设置好的时候被调用, 如果 factory 里
    // 调用了其它依赖, 将会递归执行该步骤,
    // 这样所有的依赖就被创建了
    get: () => factory(container),
  })
})
//#endregion auto-di
// 缺点: 需要解决循环依赖, 详情看 cyclic-denpendencies 目录
