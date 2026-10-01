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
	// time.Sleep(time.Second * 3)
	c <- "Hello from service1"
}

func service2(c chan string) {
	// time.Sleep(time.Second * 6)
	c <- "Hello from service2"
}

func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)

	go service1(ch1)
	go service2(ch2)

	select {
	case msg1 := <-ch1:
		fmt.Println("Response from service1", msg1, time.Since(start))
	case msg2 := <-ch2:
		fmt.Println("Response from service2", msg2, time.Since(start))
	}

	fmt.Printf("Done in %v\n", time.Since(start))
}
