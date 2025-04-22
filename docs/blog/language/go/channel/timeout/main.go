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
	time.Sleep(time.Second * 3)
	c <- "Hello from service1"
}

func service2(c chan string) {
	time.Sleep(time.Second * 6)
	c <- "Hello from service2"
}

func main() {
	fmt.Println("main() started", time.Since(start))

	chan1 := make(chan string)
	chan2 := make(chan string)

	go service1(chan1)
	go service2(chan2)

	select {
	case res := <-chan1:
		fmt.Println("chan1", res, time.Since(start))
	case res := <-chan2:
		fmt.Println("chan2", res, time.Since(start))
	case <-time.After(time.Second * 2):
		fmt.Println("No response received", time.Since(start))
	}

	fmt.Println("main() completed", time.Since(start))
}
