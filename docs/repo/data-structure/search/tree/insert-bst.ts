import { BiTNode } from '../../tree/tree.ts'

export function insertBST<T>(node: BiTNode<T>, tree: BiTNode<T>) {
  if (node.data < tree.data) {
    if (tree.lchild) {
      insertBST(node, tree.lchild)
    } else {
      tree.lchild = node
    }
  } else if (node.data > tree.data) {
    if (tree.rchild) {
      insertBST(node, tree.rchild)
    } else {
      tree.rchild = node
    }
  }
}
