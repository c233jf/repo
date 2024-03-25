import { Item } from '../item.ts'

function shellInsert(unorderedList: Item[], dk: number) {
  for (let i = dk; i < unorderedList.length; i++) {
    if (unorderedList[i].key < unorderedList[i - dk].key) {
      const temp = unorderedList[i]
      let j = i - dk
      for (; j >= 0 && temp.key < unorderedList[j].key; j -= dk) {
        unorderedList[j + dk] = unorderedList[j]
      }
      unorderedList[j + dk] = temp
    }
  }
}

export function shellSort(unorderedList: Item[], dt: number[], t: number) {
  // 按增量序列 dt[] 对顺序表 unorderedList[] 做 t 趟希尔排序。
  for (let i = 0; i < t; i++) {
    shellInsert(unorderedList, dt[i])
  }
}
