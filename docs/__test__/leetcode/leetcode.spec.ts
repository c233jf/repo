import { canConstruct } from '../../blog/data-structure/leetcode/can-construct.ts'
import { fizzBuzz } from '../../blog/data-structure/leetcode/fizz-buzz.ts'
import { maximumWealth } from '../../blog/data-structure/leetcode/maximum-wealth.ts'
import {
  ListNode,
  middleNode,
} from '../../blog/data-structure/leetcode/middle-node.ts'
import { numberOfSteps } from '../../blog/data-structure/leetcode/number-of-steps.ts'
import { runningSum } from '../../blog/data-structure/leetcode/running-sum.ts'

describe('一维数组的动态和', () => {
  test('返回 [1,3,6,10]', () => {
    expect(runningSum([1, 2, 3, 4])).toEqual([1, 3, 6, 10])
  })

  test('返回 [1,2,3,4,5]', () => {
    expect(runningSum([1, 1, 1, 1, 1])).toEqual([1, 2, 3, 4, 5])
  })

  test('返回 [3,4,6,16,17]', () => {
    expect(runningSum([3, 1, 2, 10, 1])).toEqual([3, 4, 6, 16, 17])
  })
})

describe('将数字变成 0 的操作次数', () => {
  test('返回 6', () => {
    expect(numberOfSteps(14)).toBe(6)
  })

  test('返回 4', () => {
    expect(numberOfSteps(8)).toBe(4)
  })

  test('返回 12', () => {
    expect(numberOfSteps(123)).toBe(12)
  })
})

describe('最富有客户的资产总量', () => {
  test('返回 6', () => {
    expect(
      maximumWealth([
        [1, 2, 3],
        [3, 2, 1],
      ])
    ).toBe(6)
  })

  test('返回 10', () => {
    expect(
      maximumWealth([
        [1, 5],
        [7, 3],
        [3, 5],
      ])
    ).toBe(10)
  })

  test('返回 17', () => {
    expect(
      maximumWealth([
        [2, 8, 7],
        [7, 1, 3],
        [1, 9, 5],
      ])
    ).toBe(17)
  })
})

describe('Fizz Buzz', () => {
  test('返回 ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz"]', () => {
    expect(fizzBuzz(10)).toEqual([
      '1',
      '2',
      'Fizz',
      '4',
      'Buzz',
      'Fizz',
      '7',
      '8',
      'Fizz',
      'Buzz',
    ])
  })

  test('返回 ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', () => {
    expect(fizzBuzz(15)).toEqual([
      '1',
      '2',
      'Fizz',
      '4',
      'Buzz',
      'Fizz',
      '7',
      '8',
      'Fizz',
      'Buzz',
      '11',
      'Fizz',
      '13',
      '14',
      'FizzBuzz',
    ])
  })
})

describe('链表的中间结点', () => {
  test('返回 [3,4,5]', () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    )
    expect(middleNode(head)).toEqual(
      new ListNode(3, new ListNode(4, new ListNode(5)))
    )
  })

  test('返回 [4,5,6]', () => {
    const head = new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))
      )
    )
    expect(middleNode(head)).toEqual(
      new ListNode(4, new ListNode(5, new ListNode(6)))
    )
  })
})

describe('赎金信', () => {
  test('返回 true', () => {
    expect(canConstruct('aa', 'aab')).toBe(true)
  })

  test('返回 false', () => {
    expect(canConstruct('aa', 'ab')).toBe(false)
  })
})
