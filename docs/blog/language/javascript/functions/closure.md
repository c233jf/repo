# 闭包

**闭包**是指引用了另一个函数作用域中的变量的函数。创建闭包的常见方式就是在一个函数内部创建另一个函数。

```js{3-4}
function example(property) {
  return (o1, o2) => {
    let v1 = o1[property]
    let v2 = o2[property]

    if (v1 < v2) {
      return -1
    } else if (v1 > v2) {
      return 1
    } else {
      return 0
    }
  }
}
```

可以看到内部函数中突出的两行代码引用了外部函数的变量 `property`。

## References

- JavaScript 高级程序设计（第 3 版）第 7 章 7.2 小节
