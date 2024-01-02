# 字符和字符串

## 字符串

C++ 中的字符串表示使用双引号包裹的字符序列，并且会自动在字符串末尾添加 `\0` 表示字符串结束。

```cpp
const char* str1 = "hello";
std::cout << strlen(str1) << '\n';
std::cout << sizeof("hello") << '\n';
```

字符串（除 `std::string` 定义的）是常量，所以不可修改。本质上，字符串是字符类型的数组。

## References

- [字符串和字符文本](https://learn.microsoft.com/zh-cn/cpp/cpp/string-and-character-literals-cpp?view=msvc-160)
