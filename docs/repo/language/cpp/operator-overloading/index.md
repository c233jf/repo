# 运算符重载

C++ 中我们可以通过重载运算符，赋予运算符不同含义。具体操作是定义一个函数名为 `operator` + `运算符` 的函数，例子如下：

<<< ./operator-overloading.cpp

::: tip
本质上 `Point p3 = p1 + p2;` 是调用了 `operator+` 函数。

你可以打开反汇编视图查看，会发现有一句类似 `call 0x555555555241 <operator+(Point const&, Point const&)>` 的调用（请注意，以上代码运行在 WSL 上，可能与你的反汇编视图有所不同）。

当然，这就意味着你可以使用函数调用的方式使用 —— `Point p3 = operator+(p1, p2);`。不过，一般而言，日常编码中更多使用 `Point p3 = p1 + p2;` 这种方式。
:::

## 继承

运算符重载在继承中的用法与其它普通函数类似：

<<< ./operator-overloading-2.cpp

## 仿函数（函数对象、函数调用）

<<< ./operator-overloading-3.cpp

::: tip
你可能很好奇上面的方式与直接在全局定义一个普通函数有什么区别。

```cpp
// 如下函数也能执行类似的操作
int sum(int x, int y) {
  return x + y
}
```

1. 第一种实际上是在调用成员函数，这意味着我们可以在函数内直接访问私有成员变量，而全局定义的普通函数不能；
2. 对比普通函数，它作为对象可以利用成员变量保存状态。

:::

## References

- [运算符重载](https://learn.microsoft.com/zh-cn/cpp/cpp/operator-overloading?view=msvc-160)
- [视频](https://www.bilibili.com/video/BV1KM4y1F7tR/?p=96&spm_id_from=pageDriver&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)
