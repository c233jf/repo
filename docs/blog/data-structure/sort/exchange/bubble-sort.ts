import { Item } from '../item.ts'

export function bubbleSort(records: Item[]) {
  let i = records.length - 1
  // 用于标记是否发生交换。
  let flag = true
  while (i > 0 && flag) {
    // 每次遍历都假设没有发生交换。
    flag = false
    for (let j = 0; j < i; j++) {
      if (records[j].key > records[j + 1].key) {
        ;[records[j], records[j + 1]] = [records[j + 1], records[j]]
        // 发生交换。
        flag = true
      }
    }
    i--
  }
}
