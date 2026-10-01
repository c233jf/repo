import { consola } from 'consola'

consola.log(isNaN(NaN)) // true
consola.log(isNaN('str')) // true
// Number.isNaN 与全局函数 isNaN 不同，它不会尝试将参数转换为数字，因此可以正确区分字符串和数字
consola.log(Number.isNaN('str')) // false

// NaN 不等于任何东西，包括它自身
// eslint-disable-next-line use-isnan
consola.log(NaN === NaN) // false

consola.log(isFinite('15')) // true
consola.log(isFinite('str')) // false，因为是一个特殊的值：NaN
consola.log(isFinite(Infinity)) // false，因为是一个特殊的值：Infinity

// 有时 isFinite 被用于验证字符串值是否为常规数字
// 请注意，在所有数字函数中，包括 isFinite，空字符串或仅有空格的字符串均被视为 0

consola.log(isFinite('')) // true，空字符串被视为 0
consola.log(isFinite('  ')) // true，空格字符串被视为 0

// 有一个特殊的内建方法 Object.is，它类似于 === 一样对值进行比较，但它对于两种边缘情况更可靠：
// 1. 它适用于 NaN：NaN 应该等于 NaN
// 2. 它适用于 -0 和 0：从技术上讲，它们是不同的，即使它们在数学上被视为相等，例如在判断相等性方面。
// 在所有其他情况下，Object.is(a, b) 与 a === b 相同。
// 这种比较方式经常被用在 JavaScript 规范中。当内部算法需要比较两个值是否完全相同时，它使用 Object.is（内部称为 [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)）。

consola.log(Object.is(0, -0)) // false
// 从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。
// eslint-disable-next-line no-compare-neg-zero
consola.log(0 === -0) // true

consola.log(Object.is(NaN, NaN)) // true
// eslint-disable-next-line use-isnan
consola.log(NaN === NaN) // false
