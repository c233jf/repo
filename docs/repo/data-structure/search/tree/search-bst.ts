import { BiTNode } from '../../tree/tree.ts'

export function searchBST<T>(key: T, tree?: BiTNode<T>) {
  if (!tree || typeof tree.data === 'undefined' || tree.data === null)
    return null
  if (key === tree.data) return tree

  if (key < tree.data) {
    return searchBST(key, tree.lchild)
  } else {
    return searchBST(key, tree.rchild)
  }
}
