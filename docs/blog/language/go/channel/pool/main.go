package main

import (
	"fmt"
	"time"
)

// worker that make squares
func sqrWorker(tasks <-chan int, results chan<- int, instance int) {
	for n := range tasks {
		time.Sleep(time.Millisecond) // simulating blocking task
		fmt.Printf("[Worker %d] Sending result by worker %d\n", instance, instance)
		results <- n * n
	}
}

func main() {
	fmt.Println("[main] main() started")

	tasks := make(chan int, 10)
	results := make(chan int, 10)

	// launching 3 worker goroutines
	for i := range 3 {
		go sqrWorker(tasks, results, i)
	}

	// passing 5 tasks
	for i := range 5 {
		tasks <- i * 2 // non-blocking as buffer capacity is 10
	}

	fmt.Println("[main] Wrote 5 tasks")

	// closing tasks
	close(tasks)

	// receiving results from all the workers
	for i := range 5 {
		result := <-results // blocking because buffer is empty
		fmt.Println("[main] Result", i, ":", result)
	}

	fmt.Println("[main] main() completed")
}
