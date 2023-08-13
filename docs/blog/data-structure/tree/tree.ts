export class BiTNode<T> {
  constructor(
    public data?: T,
    public lchild?: BiTNode<T>,
    public rchild?: BiTNode<T>
  ) {}
}

//#region preorderTraverse
export function preorderTraverse<T>(
  tree?: BiTNode<T>,
  pre: (T | undefined)[] = []
) {
  if (tree) {
    pre.push(tree.data)
    preorderTraverse(tree.lchild, pre)
    preorderTraverse(tree.rchild, pre)
  }

  return pre
}
//#endregion preorderTraverse

//#region inorderTraverse
export function inorderTraverse<T>(
  tree?: BiTNode<T>,
  pre: (T | undefined)[] = []
) {
  if (tree) {
    inorderTraverse(tree.lchild, pre)
    pre.push(tree.data)
    inorderTraverse(tree.rchild, pre)
  }

  return pre
}
//#endregion inorderTraverse

//#region postorderTraverse
export function postorderTraverse<T>(
  tree?: BiTNode<T>,
  pre: (T | undefined)[] = []
) {
  if (tree) {
    postorderTraverse(tree.lchild, pre)
    postorderTraverse(tree.rchild, pre)
    pre.push(tree.data)
  }

  return pre
}
//#endregion postorderTraverse

//#region createBiTree
export function createBiTree<T>(data: T[]) {
  const stack: BiTNode<T>[] = []
  let tree: BiTNode<T> | undefined
  let root = tree
  let prop: 'lchild' | 'rchild' = 'lchild'

  data.forEach((e) => {
    if (e !== null) {
      if (tree) {
        tree = tree[prop] = new BiTNode(e)
      } else {
        root = tree = new BiTNode(e)
      }
      stack.push(tree)
      prop = 'lchild'
    } else {
      if (stack.length) {
        tree = stack.pop()
      }
      prop = 'rchild'
    }
  })

  return root
}
//#endregion createBiTree

//#region copy
export function copy<T>(tree?: BiTNode<T>) {
  if (!tree) return

  const root = new BiTNode(tree.data)
  root.lchild = copy(tree.lchild)
  root.rchild = copy(tree.rchild)
  return root
}
//#endregion copy

//#region depth
export function depth<T>(tree?: BiTNode<T>): number {
  if (!tree) return 0

  const m = depth(tree.lchild)
  const n = depth(tree.rchild)
  return m > n ? m + 1 : n + 1
}
//#endregion depth

//#region count
export function count<T>(tree?: BiTNode<T>): number {
  if (!tree) return 0
  return count(tree.lchild) + count(tree.rchild) + 1
}
//#endregion count

//#region inorderThreading
export class ThreadBiTNode<T> extends BiTNode<T> {
  /**
   *
   * @param data
   * @param lchild
   * @param rchild
   * @param ltag 0: 指示结点的左孩子 1: 指示结点的前驱
   * @param rtag 0: 指示结点的右孩子 1: 指示结点的后继
   */
  constructor(
    data?: T,
    public lchild?: ThreadBiTNode<T>,
    public rchild?: ThreadBiTNode<T>,
    public ltag?: 0 | 1,
    public rtag?: 0 | 1
  ) {
    super(data, lchild, rchild)
  }
}

let pre: ThreadBiTNode<any>

function _inorderThreading<T>(tree?: BiTNode<T>) {
  if (!tree) return

  const threadTree = new ThreadBiTNode(tree.data, tree.lchild, tree.rchild)

  if (!tree.lchild) {
    threadTree.ltag = 1 // 加上左线索
    threadTree.lchild = pre // 指向前驱结点
  } else {
    threadTree.ltag = 0
    threadTree.lchild = _inorderThreading(tree.lchild)
  }

  if (!pre.rchild) {
    pre.rtag = 1 // 加上右线索
    pre.rchild = threadTree // 指向后继结点
  } else {
    pre.rtag = 0
  }
  pre = threadTree

  threadTree.rchild = _inorderThreading(tree.rchild)

  return threadTree
}

export function inorderThreading<T>(tree?: BiTNode<T>) {
  const headNode = new ThreadBiTNode()
  headNode.ltag = 0 // 头结点有左孩子，若树非空，则左孩子为树根结点
  headNode.rtag = 1 // 头结点右孩子为右线索

  if (tree) {
    pre = headNode
    headNode.lchild = _inorderThreading(tree)
    pre.rchild = headNode // 上述算法结束后，pre 为最右结点，pre 右线索指向头结点
    pre.rtag = 1
    headNode.rchild = pre
  }

  return headNode
}
//#endregion inorderThreading

//#region inorderTraverseThread
/**
 * 遍历中序线索二叉树
 * @param tree 带有头结点的中序线索二叉树
 */
export function inorderTraverseThread<T>(tree: ThreadBiTNode<T>) {
  let p = tree.lchild // 指向根结点
  const result: (T | undefined)[] = []

  while (p !== tree) {
    while (p?.ltag === 0) {
      p = p.lchild
    }
    result.push(p?.data)
    while (p?.rtag === 1 && p.rchild !== tree) {
      p = p.rchild
      result.push(p?.data)
    }
    p = p?.rchild
  }

  return result
}
//#endregion inorderTraverseThread

//#region HTNode
export class HTNode {
  constructor(
    public weight: number,
    public parent: number,
    public lchild: number,
    public rchild: number
  ) {}
}

function select(
  huffmanTrees: HTNode[],
  end: number = huffmanTrees.length
): [number, number] {
  let p1 = 0
  let p2 = 0

  for (let i = 1; i <= end; i++) {
    const ele = huffmanTrees[i]
    if (ele.parent) continue

    if (!p1) {
      p1 = i
      continue
    } else if (!p2) {
      p2 = i
      continue
    }
    if (huffmanTrees[p1].weight > huffmanTrees[p2].weight) {
      ;[p1, p2] = [p2, p1]
    }

    if (ele.weight < huffmanTrees[p1].weight) {
      p2 = p1
      p1 = i
    } else if (ele.weight < huffmanTrees[p2].weight) {
      p2 = i
    }
  }

  return [p1, p2]
}

export function createHuffmanTree(weight: number[]) {
  const huffmanTrees: HTNode[] = []
  const total = 2 * weight.length - 1 // 结点总数

  for (let i = 1; i <= total; i++) {
    /**
     * 从 1 号单元开始，依次将 1 至 2n-1 所有单元中
     * 的双亲、左孩子、右孩子的下标都初始化为 0；对
     * 前 n 个单元初始化权值
     */
    huffmanTrees[i] = new HTNode(weight[i - 1] ?? 0, 0, 0, 0)
  }

  for (let i = weight.length + 1; i <= total; i++) {
    // 从当前森林中选择双亲为 0 且权值最小的两个树根结点
    const [p1, p2] = select(huffmanTrees, i - 1)
    // 将 i 指向的结点作为这两棵子树的根结点
    huffmanTrees[p1].parent = huffmanTrees[p2].parent = i
    huffmanTrees[i].lchild = p1
    huffmanTrees[i].rchild = p2
    huffmanTrees[i].weight = huffmanTrees[p1].weight + huffmanTrees[p2].weight
  }

  return huffmanTrees
}
//#endregion HTNode
