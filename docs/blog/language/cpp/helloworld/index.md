---
prev: false
---

# HelloWorld

<<< ./helloworld.cpp

::: tip
你可能从网络上的许多教程、博客或文档中看过使用 `std::endl` 作为分行，而不是 `\n`。

它们的区别是：

`std::endl` 会做以下 3 件事：

1. 把 `\n` 放到输出流缓冲区；
2. 刷新缓冲区；
3. 返回输出流。

而 `\n` 只是一个行分隔符。在频繁输出的情况下，`std::endl` 会不断的刷新缓冲区，导致性能会低于使用 `\n`。所以，一般情况下，如果你只是想换行的话请使用 `\n` 替代 `std::endl`。
:::
