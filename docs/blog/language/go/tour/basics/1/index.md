# 包

每个 Go 程序都由包构成。

程序从 `main` 包开始运行。

本程序通过导入路径 `"fmt"` 和 `"math/rand"` 来使用这两个包。

按照约定，包名与导入路径的最后一个元素一致。例如，`"math/rand"` 包中的源码均以 `package rand` 语句开始。

<<< ./main.go

## 参考

- [Go 语言之旅](https://tour.go-zh.org/basics/1)
