// #region static-list-node
const RADIX = 10

export class StaticListNode {
  constructor(public keys: number[], public next: number) {}
}

function distribute(
  link: StaticListNode[],
  heads: number[],
  tails: number[],
  exp: number
) {
  let p = link[0].next // 取头结点指向的元素。
  while (p) {
    const i = link[p].keys[exp]
    if (heads[i] === -1) {
      heads[i] = p
    } else {
      link[tails[i]].next = p
    }
    tails[i] = p
    p = link[p].next
  }
}

function collect(link: StaticListNode[], heads: number[], tails: number[]) {
  let j = 0
  while (heads[j] === -1) {
    // 找到第一个非空链表。
    j++
  }
  link[0].next = heads[j] // 头结点指向第一个非空链表。

  let t = tails[j]
  let i = j + 1
  while (i < RADIX) {
    if (heads[i] !== -1) {
      // 找到下一个非空链表，并且链接到上一个非空链表。
      link[t].next = heads[i]
      t = tails[i]
    }
    i++
  }
  link[t].next = 0 // 尾结点指向头结点。
}

export function radixSort(link: StaticListNode[], exp: number) {
  const heads = Array.from({ length: RADIX }, () => -1)
  const tails = Array.from({ length: RADIX }, () => -1)
  distribute(link, heads, tails, exp)
  collect(link, heads, tails)
  if (exp > 0) {
    radixSort(link, exp - 1)
  }
}
// #endregion static-list-node

// #region radix-sort
export class RadixSort {
  static sort(arr: number[]): number[] {
    const max = Math.max(...arr)
    let exp = 1
    while (Math.floor(max / exp) > 0) {
      arr = this.countSort(arr, exp)
      exp *= RADIX
    }
    return arr
  }

  private static countSort(arr: number[], exp: number): number[] {
    const count = Array.from({ length: RADIX }, () => 0)
    const output = Array.from({ length: arr.length }, () => 0)
    const units = arr.map((item) => Math.floor(item / exp) % RADIX)
    for (let i = 0; i < arr.length; i++) {
      count[units[i]]++
    }
    for (let i = 1; i < RADIX; i++) {
      count[i] += count[i - 1]
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[units[i]] - 1] = arr[i]
      count[units[i]]--
    }
    return output
  }
}
// #endregion radix-sort
