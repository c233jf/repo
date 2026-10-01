package main

import (
	"fmt"
	"sync"
)

// 从切片中读取元素，写入 input channel
func getInputChan() <-chan int {
	input := make(chan int, 100)

	// 用来写到通道的数据
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

	// 启动协程，把数据写入通道
	go func() {
		defer close(input)
		for n := range numbers {
			input <- n
		}
	}()

	return input
}

// 把从 input channel 读取的数据进行平方运算，写入 output channel
func getSquareChan(input <-chan int) <-chan int {
	output := make(chan int, 100)

	go func() {
		defer close(output)
		for n := range input {
			output <- n * n
		}
	}()

	return output
}

// 返回对 `outputsChan` 通道合并之后的通道
// 这会创建扇入通道
func merge(outputsChan ...<-chan int) <-chan int {
	var wg sync.WaitGroup

	merged := make(chan int, 100)

	// 增加一个计数器，计数器的参数为outputsChan的长度
	// 因为我们将会创建多个goroutine,其中goroutine的数量就是要准备进行合并的通道的数量
	wg.Add(len(outputsChan))

	// 从sc channel读取数据，写入到merged 通道
	output := func(sc <-chan int) {
		// 一旦sc通道关闭，
		// 在`WaitGroup`上调用`Done`来递减计数器
		defer wg.Done()
		for n := range sc {
			merged <- n
		}
	}

	// 把 `output` 函数运行为 groutines，
	// 启动 n 个协程
	// 其中 n 等于作为函数参数接收的通道数
	// 这里我们在 `outputsChan` 上使用 `for range` 循环，因此无需手动告诉 `n`
	for _, outputChan := range outputsChan {
		go output(outputChan)
	}

	// 一旦完成，运行 goroutine 关闭 merged 通道
	go func() {
		wg.Wait()
		close(merged)
	}()

	return merged
}

func main() {
	// 步骤1：获取输入数字通道
	// 通过调用 `getInputChan` 函数，它运行一个 goroutine，将数字发送到返回的通道
	chanInputNums := getInputChan()

	// 步骤2：对多个 goroutine 进行 `扇出` 平方操作
	// 这可以通过多次调用 `getSquareChan` 函数来完成，其中单个函数调用返回一个通道，该通道发送由 `chanInputNums` 通道提供的数字的平方
	// `getSquareChan` 函数在内部运行 goroutine，同时运行平方操作
	chanSquareNums1 := getSquareChan(chanInputNums)
	chanSquareNums2 := getSquareChan(chanInputNums)

	// 步骤3：扇入（合并）`chanSquareNums1` 和 `chanSquareNums2` 输出到合并频道
	// 这是通过调用 `merge` 函数实现的，该函数将多个通道作为参数
	// 并使用 `WaitGroup` 和多个 goroutines 来接收平方数，我们可以发送平方数
	// 到 `merged` 通道，并关闭
	chanMerged := merge(chanSquareNums1, chanSquareNums2)

	// 步骤4：计算 0 到 9 之间的所有整数的平方再求和，大约是 `285`
	// 这是通过在 `chanMerged` 上使用 `for range` 循环来完成的
	sum := 0

	// 运行直到 `chanMerged` 或合并频道关闭
	// 当所有 goroutines 推送到合并频道完成时，在 `merge` 函数中发生
	for n := range chanMerged {
		sum += n
	}

	// 打印结果
	fmt.Println("sum of squares from 0 to 9 is", sum)
}
