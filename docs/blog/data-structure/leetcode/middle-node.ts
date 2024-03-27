export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function middleNode(head: ListNode | null) {
  let slow = head
  let fast = head
  while (fast?.next) {
    slow = slow!.next
    fast = fast.next.next
  }
  return slow
}
