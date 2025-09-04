package main

import "fmt"

func compute(fn func(int, int) int, a int, b int) int {
	return fn(a, b)
}

func main() {
	fmt.Println(compute(func(a int, b int) int {
		return a + b
	}, 1, 2))
}
