# Lambda 表达式

Lambda 表达式是一种在被调用的位置或作为参数传递给函数的位置定义匿名函数对象（闭包）的简便方法。类似于 JS 中的闭包、ios 中的 Block，本质是函数。

语法：`[capture 子句](可选的参数列表) 可选的 mutable 可选的 throw() 可选的 -> 类型 {函数体}`

简单的 Lambda 表达式：`[] {};`

让我们看更多例子：

<<< ./lambda-1.cpp

## References

- [文档](https://learn.microsoft.com/zh-cn/cpp/cpp/lambda-expressions-in-cpp?view=msvc-160)
- [视频](https://www.bilibili.com/video/BV1KM4y1F7tR/?p=115&spm_id_from=pageDriver&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)
- [使用规范](https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/others/#lambda)
