async function fn1() {
  console.log(1)
  await fn2()
  console.log(2) // 阻塞
}

async function fn2() {
  console.log('fn2')
}

fn1()

console.log(3)

// output: 1 fn2 3 2
