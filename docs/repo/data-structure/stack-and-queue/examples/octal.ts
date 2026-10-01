export function conversion(n: number) {
  const stack: number[] = []

  while (n) {
    stack.push(n % 8)
    n = Math.trunc(n / 8)
  }

  return stack.reverse().join('')
}
