const arr = [1, 4, 3, 6, 7, 8, 9, 2]
const result = []

for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] > 5) result.push(arr[i])
}

console.log(result) // [ 9, 8, 7, 6 ]
