//#region init
export class List<T> {
  length = 0
  headNode = new ListNode<T>()
}

export class ListNode<T> {
  constructor(public data?: T, public next: ListNode<T> | null = null) {}
}

new List()
//#endregion init

//#region get
export function getElement<T>(list: List<T>, index: number) {
  let prev: ListNode<T> | null = list.headNode

  for (let i = 0; i < index && prev; i++) {
    prev = prev.next
  }

  return prev?.data
}
//#endregion get

//#region find
export function find<T>(list: List<T>, e: T) {
  let prev: ListNode<T> | null = list.headNode
  while (prev && prev.data !== e) {
    prev = prev.next
  }
  return prev
}
//#endregion find

//#region insert
export function insert<T>(list: List<T>, index: number, e: T) {
  let prev: ListNode<T> | null = list.headNode

  for (let i = 0; i < index - 1 && prev; i++) {
    prev = prev.next
  }
  // 插入的位置超过链表长度 + 1
  if (!prev) return false

  const newNode = new ListNode(e)
  newNode.next = prev.next
  prev.next = newNode
  list.length++
  return true
}
//#endregion insert

//#region delete
export function del<T>(list: List<T>, index: number) {
  let prev: ListNode<T> | null = list.headNode
  for (let i = 0; i < index - 1 && prev; i++) {
    prev = prev.next
  }
  // 删除的位置超过链表长度
  if (!prev?.next) return false

  const target = prev.next
  prev.next = target.next
  list.length--
  return true
}
//#endregion delete

//#region createListHead
export function createListFromHead<T>(ele: T[]) {
  const { length } = ele
  const list = new List<T>()
  list.length = length

  for (let i = 0; i < length; i++) {
    const newNode = new ListNode<T>(ele[i])
    newNode.next = list.headNode.next
    list.headNode.next = newNode
  }
  return list
}
//#endregion createListHead

//#region createListReverse
export function createListFromReverse<T>(ele: T[]) {
  const { length } = ele
  const list = new List<T>()
  list.length = length
  let lastNode = list.headNode

  for (let i = 0; i < length; i++) {
    const newNode = new ListNode<T>(ele[i])
    lastNode.next = newNode
    lastNode = newNode
  }
  return list
}
//#endregion createListReverse
