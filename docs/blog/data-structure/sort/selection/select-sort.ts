import { Item } from '../item.ts'

export function selectSort(records: Item[]) {
  for (let i = 0; i < records.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < records.length; j++) {
      if (records[j].key < records[min].key) {
        min = j
      }
    }
    if (min !== i) {
      ;[records[i], records[min]] = [records[min], records[i]]
    }
  }
}
