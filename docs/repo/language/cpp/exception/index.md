# 异常处理

程序错误通常分为两类：

- 逻辑错误：由编程失误导致的错误，例如“索引超出范围”
- 异常：超出程序的控制范围的错误条件，例如“网络服务不可用”、“内存不足”

许多编程语言都有对异常的处理，C++ 当然也不例外。

示例：

<<< ./exception-1.cpp

::: tip
为了增强可读性和方便团队协作，如果函数内部可能抛出异常，建议声明异常类型。

```cpp
void Test(int n) throw(std::overflow_error) {
  if (n > std::numeric_limits<char>::max()) {
    throw std::overflow_error("n is too large");
  }
}
```

:::

## 自定义异常

在 C++ 中我们除了可以 `throw` 标准库已经定义了的异常，我们还可以 `throw` 任何类型，例如 `throw -1`、`throw "This is an exception"`。但一般而言，我们建议 `throw` 从 `std::exception` 直接或间接继承的类型。

示例：

<<< ./exception-2.cpp

`std::runtime_error` 继承 `std::exception`，表示运行时错误的异常。

## References

- [文档](https://learn.microsoft.com/zh-cn/cpp/cpp/exception-handling-in-visual-cpp?view=msvc-160)
- [视频](https://www.bilibili.com/video/BV1KM4y1F7tR/?p=118&spm_id_from=pageDriver&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)
