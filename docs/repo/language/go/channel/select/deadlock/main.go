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
	ch1 := make(chan string)
	ch2 := make(chan string)

	select {
	case msg1 := <-ch1:
		fmt.Println("Received", msg1, time.Since(start))
	case msg2 := <-ch2:
		fmt.Println("Received", msg2, time.Since(start))
	default:
		fmt.Println("main() no message received", time.Since(start))
	}

	fmt.Println("main() completed", time.Since(start))
}
