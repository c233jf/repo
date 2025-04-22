package main

import (
	"fmt"
	"sync"
)

var i int

// goroutine that increments i
func worker(wg *sync.WaitGroup) {
	defer wg.Done()
	i++
}

func main() {
	var wg sync.WaitGroup

	for range 1000 {
		wg.Add(1)
		go worker(&wg)
	}

	// waiting for all the goroutines to finish
	wg.Wait()
	// value of i should be 1000
	fmt.Println("value of i after 1000 operations is", i)
}
