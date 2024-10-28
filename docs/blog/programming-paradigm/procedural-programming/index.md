# 过程式编程

**过程式编程**（Procedural programming）是[命令式编程](../imperative-programming/index.md)的子范式。主要使用过程调用或函数调用的方式来组织代码和控制流程。流程由包含一系列步骤的过程（Procedures），例程（routines），子程序（subroutines）, 方法（methods），或函数（functions）来控制。

## 示例

以 Go 语言为例，计算一个数组中所有元素的和：

```go
package main

import "fmt"

// 定义一个函数来计算数组元素的和
func sum(numbers []int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    result := sum(numbers)
    fmt.Println("Sum:", result)
}
```

在上述例子中，计算数组和的逻辑被封装在 `sum()` 中，`main()` 通过调用它来完成计算数组和并打印。

## 特点

- **模块化**：代码被划分为独立的函数或过程，每个过程完成特定的任务
- **重用性**：通过函数封装，可以在不同的地方复用相同代码，减少样板代码
- **明确控制流**：通过函数调用、条件语句和循环控制程序来清晰地指定执行顺序

## 参考

- [过程式编程](https://zh.wikipedia.org/wiki/%E8%BF%87%E7%A8%8B%E5%BC%8F%E7%BC%96%E7%A8%8B)
