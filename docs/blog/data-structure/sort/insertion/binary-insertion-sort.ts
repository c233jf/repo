import { Item } from '../item.ts'

export function binaryInsertionSort(unorderedList: Item[]) {
  for (let i = 1, { length } = unorderedList; i < length; i++) {
    const temp = unorderedList[i]
    let left = 0
    let right = i - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (temp.key < unorderedList[mid].key) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      unorderedList[j + 1] = unorderedList[j]
    }
    unorderedList[left] = temp
  }
}
