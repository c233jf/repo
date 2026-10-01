import { Item } from '../item.ts'

// #region merge
function merge(
  records: Item[],
  result: Item[],
  low: number,
  mid: number,
  high: number
) {
  let i = low
  let j = mid + 1
  let k = low

  while (i <= mid && j <= high) {
    if (records[i].key <= records[j].key) {
      result[k++] = records[i++]
    } else {
      result[k++] = records[j++]
    }
  }

  while (i <= mid) {
    result[k++] = records[i++]
  }

  while (j <= high) {
    result[k++] = records[j++]
  }
}
// #endregion merge

// #region mergeSort
function _mergeSort(
  records: Item[],
  result = records,
  low = 0,
  high = records.length - 1
) {
  if (low === high) result[low] = records[low]
  else {
    const temp: Item[] = []
    const mid = Math.floor((low + high) / 2)
    _mergeSort(records, temp, low, mid)
    _mergeSort(records, temp, mid + 1, high)
    merge(temp, result, low, mid, high)
  }
}

export function mergeSort(records: Item[]) {
  _mergeSort(records)
}
// #endregion mergeSort
