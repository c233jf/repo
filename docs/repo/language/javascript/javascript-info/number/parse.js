import { consola } from 'consola'

// 使用加号 + 或 Number() 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：
consola.log(+'100px') // NaN
// 唯一的例外是字符串开头或结尾的空格，因为它们会被忽略。

// 但在现实生活中，我们经常会有带有单位的值，例如 CSS 中的 "100px" 或 "12pt"。并且，在很多国家，货币符号是紧随金额之后的，所以我们有 "19€"，并希望从中提取出一个数值。
// 这就是 parseInt 和 parseFloat 的作用。
// 它们可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。函数 parseInt 返回一个整数，而 parseFloat 返回一个浮点数：
consola.log(parseInt('100px')) // 100
consola.log(parseFloat('12.5em')) // 12.5

consola.log(parseInt('12.3')) // 12，只有整数部分被返回了
consola.log(parseFloat('12.3.4')) // 12.3，在第二个点处停止了读取

// 某些情况下，parseInt/parseFloat 会返回 NaN。当没有数字可读时会发生这种情况：
consola.log(parseInt('a123')) // NaN

// parseInt() 函数具有可选的第二个参数。它指定了数字系统的基数，因此 parseInt 还可以解析十六进制数字、二进制数字等的字符串：
consola.log(parseInt('0xff', 16)) // 255
consola.log(parseInt('ff', 16)) // 255，没有 0x 仍然有效
consola.log(parseInt('2n9c', 36)) // 123456
