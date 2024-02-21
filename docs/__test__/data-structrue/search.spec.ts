import { createListFromReverse } from '../../blog/data-structure/linear-list/list.ts'
import { binarySearch } from '../../blog/data-structure/search/linear-list/binary-search.ts'
import { sequentialSearch } from '../../blog/data-structure/search/linear-list/sequential-search.ts'
import { createBST } from '../../blog/data-structure/search/tree/create-bst.ts'
import { deleteBSTNode } from '../../blog/data-structure/search/tree/delete-bst-node.ts'
import { insertBST } from '../../blog/data-structure/search/tree/insert-bst.ts'
import { searchBST } from '../../blog/data-structure/search/tree/search-bst.ts'
import { createBiTree } from '../../blog/data-structure/tree/tree.ts'

describe('查找', () => {
  describe('顺序查找', () => {
    const list = createListFromReverse([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    test('返回 data: 10 的结点', () => {
      expect(sequentialSearch(list, 10)).toEqual({ data: 10, next: null })
    })

    test('返回 null', () => {
      expect(sequentialSearch(list, 11)).toBeNull()
    })
  })

  describe('二分查找', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    test('返回 9', () => {
      expect(binarySearch(list, 10)).toBe(9)
    })

    test('返回 -1', () => {
      expect(binarySearch(list, 11)).toBe(-1)
    })
  })

  const biTreeData = [
    45,
    12,
    3,
    null,
    null,
    37,
    24,
    null,
    null,
    null,
    98,
    53,
    null,
    null,
    100,
    null,
    null,
  ]
  const bstData = [45, 12, 3, 37, 24, 98, 53, 100]

  describe('二叉排序树', () => {
    describe('查找', () => {
      const tree = createBiTree(biTreeData)

      test('返回 data: 100 的结点', () => {
        expect(searchBST(100, tree)).toEqual({
          data: 100,
        })
      })

      test('返回 null', () => {
        expect(searchBST(101, tree)).toBeNull()
      })
    })

    describe('插入', () => {
      const tree = createBiTree(biTreeData)!

      test('插入 101', () => {
        insertBST({ data: 101 }, tree)
        expect(tree).toEqual({
          data: 45,
          lchild: {
            data: 12,
            lchild: {
              data: 3,
            },
            rchild: {
              data: 37,
              lchild: {
                data: 24,
              },
            },
          },
          rchild: {
            data: 98,
            lchild: {
              data: 53,
            },
            rchild: {
              data: 100,
              rchild: {
                data: 101,
              },
            },
          },
        })
      })
    })

    describe('创建', () => {
      test('返回根结点', () => {
        expect(createBST(bstData)).toEqual({
          data: 45,
          lchild: {
            data: 12,
            lchild: {
              data: 3,
            },
            rchild: {
              data: 37,
              lchild: {
                data: 24,
              },
            },
          },
          rchild: {
            data: 98,
            lchild: {
              data: 53,
            },
            rchild: {
              data: 100,
            },
          },
        })
      })
    })

    describe('删除', () => {
      const tree = createBST(bstData)!

      test('删除 12', () => {
        deleteBSTNode(tree, 12)
        expect(tree).toEqual({
          data: 45,
          lchild: {
            data: 3,
            rchild: {
              data: 37,
              lchild: {
                data: 24,
              },
            },
          },
          rchild: {
            data: 98,
            lchild: {
              data: 53,
            },
            rchild: {
              data: 100,
            },
          },
        })
      })

      test('删除 37', () => {
        deleteBSTNode(tree, 37)
        expect(tree).toEqual({
          data: 45,
          lchild: {
            data: 3,
            rchild: {
              data: 24,
            },
          },
          rchild: {
            data: 98,
            lchild: {
              data: 53,
            },
            rchild: {
              data: 100,
            },
          },
        })
      })

      test('删除 45', () => {
        deleteBSTNode(tree, 45)
        expect(tree).toEqual({
          data: 24,
          lchild: {
            data: 3,
          },
          rchild: {
            data: 98,
            lchild: {
              data: 53,
            },
            rchild: {
              data: 100,
            },
          },
        })
      })

      test('删除 53', () => {
        deleteBSTNode(tree, 53)
        expect(tree).toEqual({
          data: 24,
          lchild: {
            data: 3,
          },
          rchild: {
            data: 98,
            rchild: {
              data: 100,
            },
          },
        })
      })

      test('删除 98', () => {
        deleteBSTNode(tree, 98)
        expect(tree).toEqual({
          data: 24,
          lchild: {
            data: 3,
          },
          rchild: {
            data: 100,
          },
        })
      })
    })
  })
})
