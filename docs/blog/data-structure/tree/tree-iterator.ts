import { BiTNode } from './tree'

//#region preorderTraverse
export function preorderTraverse<T>(tree?: BiTNode<T>) {
  const result: (T | undefined)[] = []
  const stack: BiTNode<T>[] = []
  let root = tree

  while (root || stack.length) {
    if (root) {
      result.push(root.data)
      stack.push(root)
      root = root.lchild
    } else {
      root = stack.pop()?.rchild
    }
  }

  return result
}
//#endregion preorderTraverse

//#region inorderTraverse
export function inorderTraverse<T>(tree?: BiTNode<T>) {
  const result: (T | undefined)[] = []
  const stack: BiTNode<T>[] = []
  let root = tree
  let top: BiTNode<T>

  while (root || stack.length) {
    if (root) {
      stack.push(root)
      root = root.lchild
    } else {
      top = stack.pop()!
      result.push(top.data)
      root = top.rchild
    }
  }

  return result
}
//#endregion inorderTraverse

//#region postorderTraverse
export function postorderTraverse<T>(tree?: BiTNode<T>) {
  const result: (T | undefined)[] = []
  const stack: BiTNode<T>[] = []
  let root = tree
  let top: BiTNode<T>

  while (root || stack.length) {
    if (root) {
      stack.push(root)
      root = root.lchild
    } else {
      top = stack.pop()!
      root = top.rchild

      if (!root || root.data === result.at(-1)) {
        root = undefined
        result.push(top.data)
      } else {
        stack.push(top)
      }
    }
  }

  return result
}
//#endregion postorderTraverse
