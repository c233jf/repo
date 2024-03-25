import { Item } from '../item.ts'

/**
 * 对顺序表 records 中的子表 records[low..high] 进行一趟排序，返回枢轴位置。
 * @param records 待排序记录
 * @param low 表的下界
 * @param high 表的上界
 * @returns 枢轴位置
 */
function partition(records: Item[], low: number, high: number) {
  // 用子表的第一个记录作枢轴记录。
  const pivot = records[low]
  const { key } = pivot
  // 从表的两端交替地向中间扫描。
  while (low < high) {
    while (low < high && records[high].key >= key) {
      high--
    }
    // 将比枢轴记录小的记录移到低端。
    records[low] = records[high]
    while (low < high && records[low].key <= key) {
      low++
    }
    // 将比枢轴记录大的记录移到高端。
    records[high] = records[low]
  }
  records[low] = pivot
  return low
}

export function quickSort(records: Item[], low = 0, high = records.length - 1) {
  if (low >= high) return

  // 一趟排序，返回枢轴位置。
  const pivotIdx = partition(records, low, high)
  // 对左子表递归排序。
  quickSort(records, low, pivotIdx - 1)
  // 对右子表递归排序。
  quickSort(records, pivotIdx + 1, high)
}
