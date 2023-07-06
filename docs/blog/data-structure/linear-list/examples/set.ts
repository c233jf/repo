import { List, ListNode, find, getElement, insert } from '../list'

//#region union
/**
 * 线性表的合并
 * @param a 线性表 a
 * @param b 线性表 b
 */
export function union<T>(a: List<T>, b: List<T>) {
  let aLength = a.length
  for (let i = 1; i <= b.length; i++) {
    const ele = getElement(b, i)
    if (!find(a, ele)) {
      insert(a, ++aLength, ele)
    }
  }
}
//#endregion union

//#region unionOrdered
/**
 * 有序表的合并
 * @param a 有序表 a
 * @param b 有序表 b
 */
export function unionOrdered<T>(a: List<T>, b: List<T>) {
  let preva = a.headNode.next
  let prevb = b.headNode.next
  const _union = new List<T>()
  let prevc = _union.headNode

  while (preva && prevb) {
    if (!preva.data || !prevb.data)
      throw new Error('Elements must be sortable!')

    if (preva.data <= prevb.data) {
      if (preva.data === prevb.data) {
        prevb = prevb.next
      }
      prevc.next = new ListNode(preva.data)
      prevc = prevc.next
      preva = preva.next
    } else {
      prevc.next = new ListNode(prevb.data)
      prevc = prevc.next
      prevb = prevb.next
    }
    _union.length++
  }

  prevc.next = preva ?? prevb

  while (prevc.next) {
    _union.length++
    prevc = prevc.next
  }
  return _union
}
//#endregion unionOrdered
