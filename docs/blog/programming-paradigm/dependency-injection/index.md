---
prev: false
next: false
---

# 依赖注入

简单来说，依赖注入由以下两部分组成：

- 参数化函数或类内部硬编码的依赖，这样我们能有更高程度的控制，并且这种方式会带来更好的测试性与可维护性（本质）
- 创建一个已经注入依赖的版本，这样我们可以分发给那些不需要关心内部构建的用户

让我们以一个生成随机数的函数的实现为例子进行说明。

假设我们有以下函数：

<<<./index.ts#randomNumber1

由于函数返回值是随机的，显然无法做单测。想要对上述函数做单测，我们就需要修改该函数，下面提供几种方法。

## 参数化

::: code-group
<<<./index.ts#randomNumber2

<<<./random-number-list.ts#randomNumberList1
:::

### 缺点

破坏了函数本身接口，降低了易用性，而且如果已经有人使用这个函数，这将会是一个 BREAKING CHANGES，我们可以看一下 `randomNumberList1`，之前使用 `randomNumber` 的用户不需要关心 `randomGenerator` 实现，甚至不会注意到它的存在，因为实现细节被有意封装在 `randomNumber` 内部。现在，因为 `randomGenerator` 被暴露出来，用户需要负责提供 `randomGenerator`，这意味着他们更有可能被 `randomNumber` 内部的更改所影响。例如，我们决定更改 `randomGenerator` 的接口。此时，用户就有可能需要更改他们提供的函数以适配新的接口。

## 区分构建与使用

::: code-group
<<<./index.ts#randomNumber3

<<<./random-number-list.ts#randomNumberList2
:::

### 缺点

依赖与原始参数混合一起，导致 `randomNumber` 的参数不得不传递给内部构建的 `randomNumber` 版本。

## 工厂函数模式

<<<./index.ts#randomNumber4

### 缺点

代码中同时存在构建和使用，这样职责不清晰，而且因为每个文件都要提前引用依赖，依赖间容易形成循环引用，即便从具体函数层面看，并没有发生函数间的循环引用。

## 统一依赖注入入口

::: code-group
<<<./index.ts#randomNumber

<<<./secure-random-number.ts

<<<./fast-random-number.ts#makeFastRandomNumber1

<<<./random-number-list.ts#makeRandomNumberList1
:::

### 缺点

统一注入的入口代码要随着业务文件的变化而变化，同时，如果构造函数之间存在复杂的依赖链条，手动维护起顺序将是一件越来越复杂的事情：比如 A 依赖 B，B 依赖 C，那么想要初始化 C 的构造函数，就要先初始化 A 再初始化 B，最后初始化 C。

## 自动依赖注入容器，保证依赖顺序正确

::: code-group
<<<./index.ts#auto-di

<<<./secure-random-number.ts

<<<./fast-random-number.ts#makeFastRandomNumber

<<<./random-number-list.ts#makeRandomNumberList
:::

### 缺点

需要解决循环依赖。下面使用两个例子说明这个问题。

使用依赖注入的情况下：

::: code-group
<<<./cyclic-dependencies/with-di/index.ts

<<<./cyclic-dependencies/with-di/a.ts

<<<./cyclic-dependencies/with-di/b.ts

<<<./cyclic-dependencies/with-di/a-impl.ts

<<<./cyclic-dependencies/with-di/b-impl.ts
:::

没有使用依赖注入的情况下：

::: code-group
<<<./cyclic-dependencies/without-di/index.ts

<<<./cyclic-dependencies/without-di/a.ts

<<<./cyclic-dependencies/without-di/b.ts
:::

## 参考

- [依赖注入](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/256.%E7%B2%BE%E8%AF%BB%E3%80%8A%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%AE%80%E4%BB%8B%E3%80%8B.md)
