package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	z := x / 2
	prev := z
	for i := 1; i == 1 || math.Abs(prev-z) > 1e-15; i++ {
		prev = z
		z -= (z*z - x) / (2 * z)
		fmt.Println(i, z)
	}
	return z
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(math.Sqrt(2))
}
