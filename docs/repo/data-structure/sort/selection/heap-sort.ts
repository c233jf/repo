import { Item } from '../item.ts'

// #region adjustHeap
function adjustHeap(records: Item[], start: number, end: number) {
  // 假设 records 已经是堆，将 records 调整为以 records[start] 为根的大根堆。
  const temp = records[start]
  for (let i = 2 * start + 1; i <= end; i = 2 * i + 1) {
    if (i < end && records[i].key < records[i + 1].key) {
      i++
    }
    if (temp.key >= records[i].key) {
      break
    }
    records[start] = records[i]
    start = i
  }
  records[start] = temp
}
// #endregion adjustHeap

// #region createHeap
function createHeap(records: Item[]) {
  const { length } = records
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    adjustHeap(records, i, length - 1)
  }
}
// #endregion createHeap

// #region heapSort
export function heapSort(records: Item[]) {
  createHeap(records)
  for (let i = records.length - 1; i > 0; i--) {
    ;[records[0], records[i]] = [records[i], records[0]]
    adjustHeap(records, 0, i - 1)
  }
}
// #endregion heapSort
