# 智能指针

现代 C++ 提供了智能指针用于防止程序存在内存和资源泄露，智能指针是 exception safe 的。

## 原始指针存在的问题

- 需要手动管理内存；
- 容易发生内存泄漏（忘记释放、出现异常等）；
- 释放之后产生野指针。

```cpp
int *p = new int();

// 记得要手动释放
delete p;
// 记得设为空指针
p = nullptr;
```

智能指针就是为了解决原始指针存在的问题。

## shared_ptr

采用引用计数的智能指针。

**使用场景**：将一个原始指针分配给多个所有者（例如，从容器返回了指针副本又想保留原始指针时）。

只有所有 `shared_ptr` 所有者超出了范围或放弃所有权，才会删除原始指针。 大小为两个指针；一个用于保存原始指针，另一个用于保存引用计数的对象。

示例：

<<< ./smart-pointers-2.cpp#shared_ptr

::: danger
`shared_ptr` 的使用有一些隐患需要注意。

以下代码会造成重复释放。

```cpp
Person* p = new Person();

{
  std::shared_ptr<Person> p1(p);
}

{
  std::shared_ptr<Person> p2(p);
}
```

以下代码会造成循环引用。

<<< ./smart-pointers-3.cpp
:::

## weak_ptr

与 `shared_ptr` 配合使用。`weak_ptr` 提供对一个或多个 `shared_ptr` 实例拥有的对象的访问，但不参与引用计数。

**使用场景**：解决 `shared_ptr` 的循环引用问题。

让我们以上面 `shared_ptr` 循环引用的代码作为例子：

<<< ./smart-pointers-4.cpp

## unique_ptr

默认使用的智能指针。大小为一个指针。只允许原始指针的一个所有者。

以上三种智能指针头文件都是 `<memory>`。

## 原理

- 栈空间的对象在销毁时会自动调用析构函数；
- 重载运算符。

通过上面两点，我们可以自己实现一个智能指针。

<<< ./smart-pointers-1.cpp

::: danger
以上的实现有一个缺陷：不能指向数组。因为释放指针的地方没有处理指向数组的指针。
:::

## References

- [文档](https://learn.microsoft.com/zh-cn/cpp/cpp/smart-pointers-modern-cpp?view=msvc-160)
- [视频](https://www.bilibili.com/video/BV1KM4y1F7tR/?p=121&spm_id_from=pageDriver&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)
