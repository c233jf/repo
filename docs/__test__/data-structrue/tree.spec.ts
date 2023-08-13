import {
  HTNode,
  ThreadBiTNode,
  copy,
  count,
  createBiTree,
  createHuffmanTree,
  depth,
  inorderThreading,
  inorderTraverse,
  inorderTraverseThread,
  postorderTraverse,
  preorderTraverse,
} from '../../blog/data-structure/tree/tree'
import {
  preorderTraverse as _preorderTraverse,
  inorderTraverse as _inorderTraverse,
  postorderTraverse as _postorderTraverse,
} from '../../blog/data-structure/tree/tree-iterator'

describe('树和二叉树', () => {
  const expressionTree = createBiTree([
    '-',
    '+',
    'a',
    null,
    null,
    '*',
    'b',
    null,
    null,
    '-',
    'c',
    null,
    null,
    'd',
    null,
    null,
    '/',
    'e',
    null,
    null,
    'f',
    null,
    null,
  ])
  const threadedExpressionTree = inorderThreading(expressionTree)
  const inorder = ['a', '+', 'b', '*', 'c', '-', 'd', '-', 'e', '/', 'f']

  describe('创建二叉链表', () => {
    test('应返回 ABCDEGF 序列的二叉链表', () => {
      expect(
        createBiTree([
          'A',
          'B',
          'C',
          null,
          null,
          'D',
          'E',
          null,
          'G',
          null,
          null,
          'F',
          null,
          null,
          null,
        ])
      ).toEqual({
        data: 'A',
        lchild: {
          data: 'B',
          lchild: {
            data: 'C',
          },
          rchild: {
            data: 'D',
            lchild: {
              data: 'E',
              rchild: {
                data: 'G',
              },
            },
            rchild: {
              data: 'F',
            },
          },
        },
      })
    })

    test('应返回表达式 a + b * (c - d) - e / f 的二叉链表', () => {
      expect(expressionTree).toEqual({
        data: '-',
        lchild: {
          data: '+',
          lchild: {
            data: 'a',
          },
          rchild: {
            data: '*',
            lchild: {
              data: 'b',
            },
            rchild: {
              data: '-',
              lchild: {
                data: 'c',
              },
              rchild: {
                data: 'd',
              },
            },
          },
        },
        rchild: {
          data: '/',
          lchild: {
            data: 'e',
          },
          rchild: {
            data: 'f',
          },
        },
      })
    })
  })

  describe('遍历二叉树', () => {
    const preorder = ['-', '+', 'a', '*', 'b', '-', 'c', 'd', '/', 'e', 'f']
    test('递归先序遍历', () => {
      expect(preorderTraverse(expressionTree)).toEqual(preorder)
    })

    test('非递归先序遍历', () => {
      expect(_preorderTraverse(expressionTree)).toEqual(preorder)
    })

    test('递归中序遍历', () => {
      expect(inorderTraverse(expressionTree)).toEqual(inorder)
    })

    test('非递归中序遍历', () => {
      expect(_inorderTraverse(expressionTree)).toEqual(inorder)
    })

    const postorder = ['a', 'b', 'c', 'd', '-', '*', '+', 'e', 'f', '/', '-']
    test('递归后序遍历', () => {
      expect(postorderTraverse(expressionTree)).toEqual(postorder)
    })

    test('非递归后序遍历', () => {
      expect(_postorderTraverse(expressionTree)).toEqual(postorder)
    })
  })

  describe('复制二叉树', () => {
    test('应返回与表达式 a + b * (c - d) - e / f 的二叉树相同的二叉树', () => {
      expect(copy(expressionTree)).toEqual(expressionTree)
    })
  })

  describe('计算二叉树深度', () => {
    test('应返回 5', () => {
      expect(depth(expressionTree)).toBe(5)
    })
  })

  describe('统计二叉树中结点个数', () => {
    test('应该返回 11', () => {
      expect(count(expressionTree)).toBe(11)
    })
  })

  describe('二叉树中序线索化', () => {
    test('应该返回表达式 a + b * (c - d) - e / f 的中序线索二叉树', () => {
      const headNode = new ThreadBiTNode<any>(
        undefined,
        undefined,
        undefined,
        0,
        1
      )
      const root = new ThreadBiTNode('-', undefined, undefined, 0, 0)
      const node1 = new ThreadBiTNode('+', undefined, undefined, 0, 0)
      const node2 = new ThreadBiTNode('a', undefined, undefined, 1, 1)
      const node3 = new ThreadBiTNode('*', undefined, undefined, 0, 0)
      const node4 = new ThreadBiTNode('b', undefined, undefined, 1, 1)
      const node5 = new ThreadBiTNode('-', undefined, undefined, 0, 0)
      const node6 = new ThreadBiTNode('c', undefined, undefined, 1, 1)
      const node7 = new ThreadBiTNode('d', undefined, undefined, 1, 1)
      const node8 = new ThreadBiTNode('/', undefined, undefined, 0, 0)
      const node9 = new ThreadBiTNode('e', undefined, undefined, 1, 1)
      const node10 = new ThreadBiTNode('f', undefined, undefined, 1, 1)

      headNode.lchild = root
      headNode.rchild = node10
      root.lchild = node1
      root.rchild = node8
      node1.lchild = node2
      node1.rchild = node3
      node2.lchild = headNode
      node2.rchild = node1
      node3.lchild = node4
      node3.rchild = node5
      node4.lchild = node1
      node4.rchild = node3
      node5.lchild = node6
      node5.rchild = node7
      node6.lchild = node3
      node6.rchild = node5
      node7.lchild = node5
      node7.rchild = root
      node8.lchild = node9
      node8.rchild = node10
      node9.lchild = root
      node9.rchild = node8
      node10.lchild = node8
      node10.rchild = headNode

      expect(threadedExpressionTree).toEqual(headNode)
    })
  })

  describe('遍历中序二叉树', () => {
    test('应返回正确序列', () => {
      expect(inorderTraverseThread(threadedExpressionTree)).toEqual(inorder)
    })
  })

  describe('构造哈夫曼树', () => {
    test('应返回 (5,29,7,8,14,23,3,11) 的哈夫曼树', () => {
      expect(createHuffmanTree([5, 29, 7, 8, 14, 23, 3, 11])).toEqual([
        undefined,
        new HTNode(5, 9, 0, 0),
        new HTNode(29, 14, 0, 0),
        new HTNode(7, 10, 0, 0),
        new HTNode(8, 10, 0, 0),
        new HTNode(14, 12, 0, 0),
        new HTNode(23, 13, 0, 0),
        new HTNode(3, 9, 0, 0),
        new HTNode(11, 11, 0, 0),
        new HTNode(8, 11, 7, 1),
        new HTNode(15, 12, 3, 4),
        new HTNode(19, 13, 9, 8),
        new HTNode(29, 14, 5, 10),
        new HTNode(42, 15, 11, 6),
        new HTNode(58, 15, 2, 12),
        new HTNode(100, 0, 13, 14),
      ])
    })
  })
})
