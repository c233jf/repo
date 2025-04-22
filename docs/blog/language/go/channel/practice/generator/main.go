package main

import "fmt"

// fib returns a channel that emits the fibonacci sequence
func fib(length int) <-chan int {
	ch := make(chan int, length)

	// run generator concurrently
	go func() {
		for i, j := 0, 1; i < length; i, j = i+j, i {
			ch <- i
		}
		close(ch)
	}()
	return ch
}

func main() {
	// read 10 fibonacci numbers from channel returned by `fib` function
	for n := range fib(10) {
		fmt.Println("Current fibonacci number is", n)
	}
}
