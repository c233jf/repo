import { Item } from '../item.ts'

export function straightInsertionSort(unorderedList: Item[]) {
  for (let i = 1, { length } = unorderedList; i < length; i++) {
    const temp = unorderedList[i]
    let j = i - 1
    while (j >= 0 && temp.key < unorderedList[j].key) {
      unorderedList[j + 1] = unorderedList[j]
      j--
    }
    unorderedList[j + 1] = temp
  }
}
