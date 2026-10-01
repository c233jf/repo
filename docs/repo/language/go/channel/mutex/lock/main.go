package main

import (
	"fmt"
	"sync"
)

var i int

// goroutine that increments i
func worker(wg *sync.WaitGroup, m *sync.Mutex) {
	defer wg.Done()
	m.Lock()
	i++
	m.Unlock()
}

func main() {
	var wg sync.WaitGroup
	var m sync.Mutex

	for range 1000 {
		wg.Add(1)
		go worker(&wg, &m)
	}

	// waiting for all the goroutines to finish
	wg.Wait()
	// value of i should be 1000
	fmt.Println("value of i after 1000 operations is", i)
}
