# 切片字面量

切片字面量类似于没有长度的数组字面量。

这是一个数组字面量：

```go
[3]bool{true, true, false}
```

下面这样则会创建一个和上面相同的数组，然后再构建一个引用了它的切片：

```go
[]bool{true, true, false}
```

<<< ./main.go
