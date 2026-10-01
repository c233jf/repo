package main

import (
	"fmt"
	"time"
)

var start time.Time

func init() {
	start = time.Now()
}

func main() {
	fmt.Println("main() started", time.Since(start))
	ch1 := make(chan string, 2)
	ch2 := make(chan string, 2)

	ch1 <- "value 1"
	ch1 <- "value 2"
	ch2 <- "value 1"
	ch2 <- "value 2"

	select {
	case msg1 := <-ch1:
		fmt.Println("Response from ch1", msg1, time.Since(start))
	case msg2 := <-ch2:
		fmt.Println("Response from ch2", msg2, time.Since(start))
	}

	fmt.Printf("Done in %v\n", time.Since(start))
}
