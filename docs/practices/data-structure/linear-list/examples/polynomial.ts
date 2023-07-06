import { List, ListNode } from '../list'

//#region add
/**
 * 两个一元多项式相加
 * @param p 一元多项式
 * @param q 一元多项式
 */
export function add(p: number[], q: number[]) {
  const length = Math.max(p.length, q.length)
  const result: number[] = []

  for (let i = 0; i < length; i++) {
    result[i] = (p[i] ?? 0) + (q[i] ?? 0)
  }
  return result
}
//#endregion add

//#region createPolynList
/**
 * 创建多项式链表
 * @param ele coef: 系数; expn: 指数
 */
export function createPolynList(ele: { coef: number; expn: number }[]) {
  const list = new List<{ coef: number; expn: number }>()
  list.length = ele.length

  ele.forEach((e) => {
    const newNode = new ListNode(e)
    let prev = list.headNode.next
    let tmp = list.headNode

    while (prev && newNode.data!.expn > prev.data!.expn) {
      tmp = prev
      prev = prev.next
    }
    newNode.next = prev
    tmp.next = newNode
  })

  return list
}
//#endregion createPolynList
