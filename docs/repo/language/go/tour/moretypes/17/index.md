# range 遍历（续）

可以将下标或值赋予 `_` 来忽略它。

```go
for i, _:= range pow
for _, value := range pow
```

若你只需要索引，忽略第二个变量即可。

```go
for i := range pow
```

<<< ./main.go
