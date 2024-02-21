export function binarySearch<T>(data: T[], key: T) {
  let low = 0
  let high = data.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (data[mid] === key) {
      return mid
    }
    if (data[mid] > key) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}
