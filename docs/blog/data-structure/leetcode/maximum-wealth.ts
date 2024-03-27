export function maximumWealth(accounts: number[][]) {
  let max = 0
  for (let i = 0, { length } = accounts; i < length; i++) {
    const sum = accounts[i].reduce((acc, cur) => acc + cur, 0)
    max = Math.max(max, sum)
  }
  return max
}
