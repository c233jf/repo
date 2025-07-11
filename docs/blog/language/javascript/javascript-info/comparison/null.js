import { consola } from 'consola'

consola.log(5 > 4) // true
consola.log('apple' > 'pineapple') // false
consola.log('2' > '12') // true
consola.log(undefined == null) // true
consola.log(undefined === null) // false
consola.log(null == '\n0\n') // false
consola.log(null === +'\n0\n') // false

/**
 *
 * 1. 数字间比较大小，显然得 true。
 * 2. 按词典顺序比较，得 false。"a" 比 "p" 小。
 * 3. 与第 2 题同理，首位字符 "2" 大于 "1"。
 * 4. null 只与 undefined 互等。
 * 5. 严格相等模式下，类型不同得 false。
 * 6. 与第 4 题同理，null 只与 undefined 相等。
 * 7. 不同类型严格不相等。
 */
