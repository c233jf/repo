# 模板

以往，我们在编写 C++ 代码的时候，都会把变量类型、函数参数类型等指定为具体某一种类型。但假设现在我们有一个函数，它支持多种类型，我们有什么方法可以实现呢？可能有人会想可以通过函数重载来实现，但这会导致许多重复代码。这里我要引出一个新概念，**泛型编程** —— 把类型参数化，在实例化时让用户指定类型。在 C++ 中，我们可以通过模板来实现泛型编程。

<<< ./templates-1.cpp

调用函数时，编译器会根据模板参数类型生成对应类型的函数，这个过程称作“**模板实例化**”。你可以在调试模式运行以上代码，然后打开反汇编视图，可以发现上述两次 `add` 的调用是两个不同的函数，分别对应 `int` 和 `double` 类型。

## 类模板

C++ 中除了函数模板外，我们还可以编写类模板。

<<< ./templates-2.cpp

## References

- [模板](https://learn.microsoft.com/zh-cn/cpp/cpp/templates-cpp?view=msvc-160)
- [视频](https://www.bilibili.com/video/BV1KM4y1F7tR/?p=105&spm_id_from=pageDriver&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)
