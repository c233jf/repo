# 字符和字符串

## 字符串

C++ 中的字符串表示使用双引号包裹的字符序列，并且会自动在字符串末尾添加 `\0` 表示字符串结束。

<<< ./string.cpp#first

::: info
`strlen` 是计算字符串长度的函数（不包含字符串结束符）。

`sizeof` 是计算表达式或类型占用字节大小的操作符。

需要注意字符串（除 `std::string` 定义的）是常量，所以这里我们使用了 `const` 限定符。
:::

本质上，字符串是字符类型的数组。所以我们也可以进行如下定义：

<<< ./string.cpp#second

::: warning
需要注意：当我们使用数组的方式定义字符串时，需要手动在末尾加上 `\0`。

否则，可能会出现以下情况：

```cpp
char str3[]{'h', 'e', 'l', 'l', 'o'};
// 打印有可能出现乱码，因为 str3 没有 '\0'，所以会一直打印内存中的值，直到遇到
// '\0'。
std::cout << str3 << '\n';
```

:::

## References

- [字符串和字符文本](https://learn.microsoft.com/zh-cn/cpp/cpp/string-and-character-literals-cpp?view=msvc-160)
