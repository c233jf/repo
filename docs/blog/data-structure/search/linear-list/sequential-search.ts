import { List, ListNode } from '../../linear-list/list'

export function sequentialSearch<T>(list: List<T>, key: T) {
  let prev: ListNode<T> | null = list.headNode
  while (prev && prev.data !== key) {
    prev = prev.next
  }
  return prev
}
