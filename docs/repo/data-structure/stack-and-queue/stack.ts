//#region init
export class ListNode<T> {
  constructor(public data?: T, public next: ListNode<T> | null = null) {}
}

const top: ListNode<any> | null = null
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
