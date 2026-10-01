export function fizzBuzz(n: number) {
  const res: string[] = []
  for (let i = 1; i <= n; i++) {
    let str = ''
    if (i % 3 === 0) {
      str += 'Fizz'
    }
    if (i % 5 === 0) {
      str += 'Buzz'
    }
    res.push(str || i.toString())
  }
  return res
}
