//#region init
export class ListNode<T> {
  data?: T
  next: ListNode<T> | null

  constructor(data?: T, next: ListNode<T> | null = null) {
    this.data = data
    this.next = next
  }
}

export const top: ListNode<any> | null = null
//#endregion init

//#region push
export function push<T>(stack: ListNode<T> | null, e: T) {
  const newNode = new ListNode<T>(e, stack)
  stack = newNode
  return stack
}
//#endregion push

//#region pop
export function pop<T>(stack: ListNode<T> | null) {
  if (!stack) return

  const popNode = stack
  stack = stack.next
  popNode.next = null
  return {
    stack,
    popNode,
  }
}
//#endregion pop

//#region getTop
export function getTop<T>(stack: ListNode<T> | null) {
  return stack?.data
}
//#endregion getTop
