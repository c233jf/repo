package main

import "fmt"

func main() {
	fmt.Println("counting")

	for i := range 10 {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}
