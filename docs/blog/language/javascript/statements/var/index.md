# 变量声明

Javascript **区分大小写**，并且使用 **Unicode** 字符集。具体参考[该文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%9F%BA%E7%A1%80)。

## 变量

在编程中，变量指的是储存值的一个符号。变量的名称也称作[标识符](https://developer.mozilla.org/zh-CN/docs/Glossary/Identifier)。

标识符命名需要遵循一定的规则：以字母、下划线（\_）或者美元符号（$）开头；后续接数字、字母、\_ 或 $。

标识符示例：`Number_hits`、`temp99`、`$credit` 和 `_name`。

## 声明

在 Javascript 中有以下方式声明变量：

- 使用关键词 `var`。例如 `var x = 1`。该语法可以用来声明函数作用域变量和全局作用域变量；
- 直接赋值。例如 `x = 1`。在函数外使用这种形式赋值，会产生一个全局变量。在严格模式下会产生错误。因此你不应该使用这种方式来声明变量；
- 使用关键词 `let`、`const`。例如 `let x = 1`、`const y = 2`。这些语法可以用来声明块级作用域的变量；
- 使用[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)将[对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%AF%B9%E8%B1%A1%E5%AD%97%E9%9D%A2%E9%87%8F)的某些属性绑定到变量。例如 `let { bar } = foo`。这会创建一个名为 `bar` 的变量，并且将对象 `foo` 中的属性 `bar` 的值赋给它。

### var

声明一个函数作用域或全局作用域的变量，并且可选初始化一个值。

```js
var name1
var name1 = value1
var name1 = value1,
  name2 = value2
var name1,
  name2 = value2
var name1 = value1,
  name2,
  /* …, */ nameN = valueN
```

具体请查看 [var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var) 文档。

### let

声明可重新赋值的块级作用域局部变量，并且可选初始化一个值。

```js
let name1
let name1 = value1
let name1 = value1,
  name2 = value2
let name1,
  name2 = value2
let name1 = value1,
  name2,
  /* …, */ nameN = valueN
```

具体请查看 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 文档。

### const

声明一个块作用域的只读常量。

```js
const name1 = value1
const name1 = value1,
  name2 = value2
const name1 = value1,
  name2 = value2,
  /* …, */ nameN = valueN
```

具体请查看 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 文档。

### 三者区别

|                                          | var                                    | let                      | const              |
| ---------------------------------------- | -------------------------------------- | ------------------------ | ------------------ |
| 初始值                                   | 可选，否则为 `undefined`               | 可选，否则为 `undefined` | 必须初始化         |
| 能否重新赋值                             | :heavy_check_mark:                     | :heavy_check_mark:       | :x:                |
| 能否在声明前进行访问                     | :heavy_check_mark:                     | :x:                      | :x:                |
| 能否重复定义                             | :heavy_check_mark:                     | :x:                      | :x:                |
| 在全局作用域中声明时能否挂载到全局对象上 | :heavy_check_mark:                     | :x:                      | :x:                |
| 全局作用域                               | :heavy_check_mark:                     | :heavy_check_mark:       | :heavy_check_mark: |
| 函数作用域                               | :heavy_check_mark:                     | :heavy_check_mark:       | :heavy_check_mark: |
| 模块作用域                               | :heavy_check_mark:                     | :heavy_check_mark:       | :heavy_check_mark: |
| 块级作用域                               | :x:                                    | :heavy_check_mark:       | :heavy_check_mark: |
| 能否与函数声明同名                       | :heavy_check_mark:，变量值始终覆盖函数 | :x:                      | :x:                |

## 参考

- [语法和数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%A3%B0%E6%98%8E)
- [var，const，let 三者之间的区别](https://leetcode.cn/leetbook/read/7-day-interview-qian-duan/dmsmom/)
