package main

import "fmt"

func main() {
	arr := []int{1, 4, 3, 6, 7, 8, 9, 2}
	result := []int{}

	for i := len(arr) - 1; i >= 0; i-- {
		if arr[i] > 5 {
			result = append(result, arr[i])
		}
	}

	fmt.Println(result) // [9 8 7 6]
}
