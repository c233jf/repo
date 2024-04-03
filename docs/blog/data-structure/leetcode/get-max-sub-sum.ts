export function getMaxSubSum(arr: number[]) {
  let maxSum = 0
  let partialSum = 0

  for (const e of arr) {
    partialSum += e
    maxSum = Math.max(maxSum, partialSum)
    if (partialSum < 0) partialSum = 0
  }

  return maxSum
}
