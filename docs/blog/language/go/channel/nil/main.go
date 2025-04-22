package main

import "fmt"

func service(c chan string) {
	c <- "response"
}

func main() {
	fmt.Println("main() started")

	var chan1 chan string

	go service(chan1)

	select {
	case res := <-chan1:
		fmt.Println("chan1", res)
	default:
		fmt.Println("default case executed")
	}

	fmt.Println("main() completed")
}
