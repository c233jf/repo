import { BiTNode } from '../../tree/tree.ts'

export function deleteBSTNode<T>(tree: BiTNode<T>, key: T) {
  let pointer: BiTNode<T> | undefined = tree
  let parent: BiTNode<T> | null = null

  // 查找关键字为 key 的结点。
  while (pointer) {
    if (pointer.data === key) {
      break
    }
    parent = pointer
    pointer = pointer.data > key ? pointer.lchild : pointer.rchild
  }
  // 未找到关键字为 key 的结点。
  if (!pointer) return

  // 存储最大结点的父结点。
  let temp = pointer
  // 被删除的结点有左右子树。
  if (pointer.lchild && pointer.rchild) {
    let max = pointer.lchild
    // 在左子树中找到最大的结点，即左子树最右下的结点。
    while (max.rchild) {
      temp = max
      max = max.rchild
    }
    // 用 max 的值替换 pointer 的值，这意味着使用 max 替换 pointer。
    pointer.data = max.data
    if (temp !== pointer) {
      temp.rchild = max.lchild
    } else {
      temp.lchild = max.lchild
    }

    return
  } else if (pointer.lchild) {
    // 被删除的结点只有左子树。
    pointer = pointer.lchild
  } else if (pointer.rchild) {
    // 被删除的结点只有右子树。
    pointer = pointer.rchild
  } else {
    // 被删除的结点没有左右子树。
    pointer = undefined
  }

  // 将 pointer 指向的结点挂载到 parent 的左子树或右子树。
  if (!parent) {
    // 被删除的结点是根结点。
    // 如果只有一个结点，那就什么都不用做。
    if (!pointer) return

    tree = pointer
  } else if (parent.lchild === temp) {
    // 被删除的结点是 parent 的左子树。
    parent.lchild = pointer
  } else {
    // 被删除的结点是 parent 的右子树。
    parent.rchild = pointer
  }
}
