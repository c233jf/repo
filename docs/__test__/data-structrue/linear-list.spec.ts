import {
  add,
  createPolynList,
} from '../../blog/data-structure/linear-list/examples/polynomial.ts'
import {
  union,
  unionOrdered,
} from '../../blog/data-structure/linear-list/examples/set.ts'
import {
  List,
  createListFromHead,
  getElement,
  find,
  insert,
  createListFromReverse,
  del,
} from '../../blog/data-structure/linear-list/list.ts'

describe('链表', () => {
  describe('初始化', () => {
    test('应该返回 List 实例', () => {
      const list = new List<number>()
      expect(list).toEqual({ length: 0, headNode: { next: null } })
    })

    describe('头插法', () => {
      test('返回空链表', () => {
        const list2 = createListFromHead([])
        expect(list2).toEqual({ length: 0, headNode: { next: null } })
      })

      test('返回一个结点的链表', () => {
        const list3 = createListFromHead([1])
        expect(list3).toEqual({
          length: 1,
          headNode: { next: { data: 1, next: null } },
        })
      })

      test('返回与传入参数顺序相反的链表', () => {
        const list4 = createListFromHead([1, 2])
        expect(list4).toEqual({
          length: 2,
          headNode: { next: { data: 2, next: { data: 1, next: null } } },
        })
      })
    })

    describe('后插法', () => {
      test('返回空链表', () => {
        const list5 = createListFromReverse([])
        expect(list5).toEqual({ length: 0, headNode: { next: null } })
      })

      test('返回一个结点的链表', () => {
        const list6 = createListFromReverse([1])
        expect(list6).toEqual({
          length: 1,
          headNode: { next: { data: 1, next: null } },
        })
      })

      test('返回与传入参数顺序相同的链表', () => {
        const list7 = createListFromReverse([1, 2])
        expect(list7).toEqual({
          length: 2,
          headNode: { next: { data: 1, next: { data: 2, next: null } } },
        })
      })
    })
  })

  describe('取值', () => {
    const list = createListFromHead([1])

    test('返回 1', () => {
      expect(getElement(list, 1)).toBe(1)
    })

    test('返回 undefined', () => {
      expect(getElement(list, 2)).toBeUndefined()
    })
  })

  describe('查找', () => {
    const list = createListFromHead([1])

    test('返回 data: 1 的结点', () => {
      expect(find(list, 1)).toEqual({ data: 1, next: null })
    })

    test('返回 null', () => {
      expect(find(list, 2)).toBeNull()
    })
  })

  describe('插入', () => {
    const list = createListFromHead([1])
    let flag = insert(list, 2, 2)

    test('插入尾部', () => {
      expect(flag).toBe(true)
      expect(list).toEqual(createListFromReverse([1, 2]))
    })

    test('插入链表中间', () => {
      flag = insert(list, 2, 3)
      expect(flag).toBe(true)
      expect(list).toEqual(createListFromReverse([1, 3, 2]))
    })

    test('插入失败', () => {
      flag = insert(list, 56, 43434)
      expect(flag).toBe(false)
      expect(list).toEqual(createListFromReverse([1, 3, 2]))
    })
  })

  describe('删除', () => {
    const list = createListFromHead([3, 2, 1])
    let flag = del(list, 2)

    test('删除中间结点', () => {
      expect(flag).toBe(true)
      expect(list).toEqual(createListFromReverse([1, 3]))
    })

    test('删除尾部结点', () => {
      flag = del(list, 2)
      expect(flag).toBe(true)
      expect(list).toEqual(createListFromHead([1]))
    })

    test('删除失败', () => {
      flag = del(list, 56)
      expect(flag).toBe(false)
      expect(list).toEqual(createListFromHead([1]))
    })
  })

  test('线性表合并', () => {
    const a = createListFromReverse([7, 5, 3, 11])
    const b = createListFromReverse([2, 6, 3])
    union(a, b)
    expect(a).toEqual(createListFromReverse([7, 5, 3, 11, 2, 6]))
  })

  test('有序表合并', () => {
    const a = createListFromReverse([3, 5, 8, 11])
    const b = createListFromReverse([2, 6, 8, 9, 11, 15, 20])
    const c = unionOrdered(a, b)
    expect(c).toEqual(createListFromReverse([2, 3, 5, 6, 8, 9, 11, 15, 20]))
  })

  test('两个一元多项式相加', () => {
    const p = [10, 5, -4, 3, 2]
    const q = [2, 3, -1, 4]
    const result = add(p, q)
    expect(result).toEqual([12, 8, -5, 7, 2])
  })

  describe('多项式链表创建', () => {
    test('传入有序, 返回有序', () => {
      const list = createPolynList([
        { coef: 7, expn: 0 },
        { coef: 3, expn: 1 },
        { coef: 9, expn: 8 },
      ])
      expect(list).toEqual(
        createListFromReverse([
          { coef: 7, expn: 0 },
          { coef: 3, expn: 1 },
          { coef: 9, expn: 8 },
        ])
      )
    })

    test('传入无序, 返回有序', () => {
      const list2 = createPolynList([
        { coef: 7, expn: 0 },
        { coef: 3, expn: 9 },
        { coef: 9, expn: 8 },
      ])
      expect(list2).toEqual(
        createListFromReverse([
          { coef: 7, expn: 0 },
          { coef: 9, expn: 8 },
          { coef: 3, expn: 9 },
        ])
      )
    })
  })
})
