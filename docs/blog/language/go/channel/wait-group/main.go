package main

import (
	"fmt"
	"sync"
	"time"
)

func service(wg *sync.WaitGroup, instance int) {
	time.Sleep(time.Second * 2)
	fmt.Println("Service called on instance", instance)
	wg.Done()
}

func main() {
	fmt.Println("main() started")

	var wg sync.WaitGroup

	for i := range 3 {
		wg.Add(1)
		go service(&wg, i)
	}

	wg.Wait()

	fmt.Println("main() completed")
}
