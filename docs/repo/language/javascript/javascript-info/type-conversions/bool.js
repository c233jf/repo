import { consola } from 'consola'
/**
 * 布尔类型转换规则
 * 1. 直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false。
 * 2. 其他值变为 true。
 */

consola.log(Boolean(1)) // true
consola.log(Boolean(0)) // false
consola.log(Boolean('hello')) // true
consola.log(Boolean('')) // false
// 请注意：包含 0 的字符串 "0" 是 true，一些编程语言（比如 PHP）视 "0" 为 false。
// 但在 JavaScript 中，非空的字符串总是 true。
consola.log(Boolean('0')) // true
consola.log(Boolean(' ')) // true
