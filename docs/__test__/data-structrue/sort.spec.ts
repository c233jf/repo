import { quickSort } from '../../blog/data-structure/sort/exchange/quick-sort.ts'
import { binaryInsertionSort } from '../../blog/data-structure/sort/insertion/binary-insertion-sort.ts'
import { shellSort } from '../../blog/data-structure/sort/insertion/shell-sort.ts'
import { straightInsertionSort } from '../../blog/data-structure/sort/insertion/straight-insertion-sort.ts'
import { Item } from '../../blog/data-structure/sort/item.ts'
import { heapSort } from '../../blog/data-structure/sort/selection/heap-sort.ts'
import { selectSort } from '../../blog/data-structure/sort/selection/select-sort.ts'

function createUnorderedList() {
  return [new Item(2), new Item(1), new Item(4), new Item(5)]
}

let unorderedList: Item[]
const orderedList = [new Item(1), new Item(2), new Item(4), new Item(5)]

beforeEach(() => {
  unorderedList = createUnorderedList()
})

describe('直接插入排序', () => {
  test('返回以关键字 [1,2,4,5] 排列的对象列表', () => {
    straightInsertionSort(unorderedList)
    expect(unorderedList).toEqual(orderedList)
  })
})

describe('二分插入排序', () => {
  test('返回以关键字 [1,2,4,5] 排列的对象列表', () => {
    binaryInsertionSort(unorderedList)
    expect(unorderedList).toEqual(orderedList)
  })
})

describe('希尔排序', () => {
  test('返回以关键字 [1,2,4,5] 排列的对象列表', () => {
    shellSort(unorderedList, [2, 1], 2)
    expect(unorderedList).toEqual(orderedList)
  })
})

describe('快速排序', () => {
  test('返回以关键字 [1,2,4,5] 排列的对象列表', () => {
    quickSort(unorderedList)
    expect(unorderedList).toEqual(orderedList)
  })
})

describe('简单选择排序', () => {
  test('返回以关键字 [1,2,4,5] 排列的对象列表', () => {
    selectSort(unorderedList)
    expect(unorderedList).toEqual(orderedList)
  })
})

describe('堆排序', () => {
  test('返回以关键字 [1,2,4,5] 排列的对象列表', () => {
    heapSort(unorderedList)
    expect(unorderedList).toEqual(orderedList)
  })
})
