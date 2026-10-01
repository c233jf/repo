import { BiTNode } from '../../tree/tree.ts'
import { insertBST } from './insert-bst.ts'

export function createBST<T>(arr: T[]) {
  if (!arr.length) return null

  const root = new BiTNode(arr[0])
  for (let i = 1, { length } = arr; i < length; i++) {
    insertBST(new BiTNode(arr[i]), root)
  }
  return root
}
