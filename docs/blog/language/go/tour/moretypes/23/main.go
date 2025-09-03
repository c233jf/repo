package main

import (
	"strings"

	"golang.org/x/tour/wc"
)

func WordCount(s string) map[string]int {
	fields := strings.Fields(s)
	result := make(map[string]int)

	for _, s := range fields {
		if _, ok := result[s]; !ok {
			result[s] = 1
		} else {
			result[s]++
		}
	}
	return result
}

func main() {
	wc.Test(WordCount)
}
