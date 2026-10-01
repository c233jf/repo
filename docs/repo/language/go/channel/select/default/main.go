package main

import (
	"fmt"
	"time"
)

var start time.Time

func init() {
	start = time.Now()
}

func service1(c chan string) {
	fmt.Println("service1() started", time.Since(start))
	c <- "Hello from service1"
}

func service2(c chan string) {
	fmt.Println("service2() started", time.Since(start))
	c <- "Hello from service2"
}

func main() {
	fmt.Println("main() started", time.Since(start))
	ch1 := make(chan string)
	ch2 := make(chan string)

	go service1(ch1)
	go service2(ch2)

	time.Sleep(time.Second * 3)

	select {
	case msg1 := <-ch1:
		fmt.Println("Response from ch1", msg1, time.Since(start))
	case msg2 := <-ch2:
		fmt.Println("Response from ch2", msg2, time.Since(start))
	default:
		fmt.Println("main() no message received", time.Since(start))
	}

	fmt.Println("main() completed", time.Since(start))
}
