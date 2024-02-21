import { dance } from '../../blog/data-structure/stack-and-queue/examples/dance.ts'
import { arithmetic } from '../../blog/data-structure/stack-and-queue/examples/expression.ts'
import { matching } from '../../blog/data-structure/stack-and-queue/examples/matching.ts'
import { conversion } from '../../blog/data-structure/stack-and-queue/examples/octal.ts'

describe('栈和队列', () => {
  describe('10 进制转 8 进制', () => {
    test('应该返回 2504', () => {
      expect(conversion(1348)).toBe('2504')
    })
  })

  describe('括号匹配', () => {
    test('匹配成功', () => {
      expect(matching('{([])}')).toBe(true)
    })

    test('右括号没有匹配', () => {
      expect(matching('{([])})')).toBe(false)
    })

    test('左括号没有匹配', () => {
      expect(matching('[{([])}')).toBe(false)
    })

    test('左右括号不匹配', () => {
      expect(matching('[{([])})')).toBe(false)
    })
  })

  describe('表达式求值', () => {
    test('应返回 15', () => {
      expect(arithmetic('3*(7-2);')).toBe(15)
    })

    test('', () => {
      expect(arithmetic('20*(100-50);')).toBe(1000)
    })
  })

  describe('舞伴问题', () => {
    test('应返回男士队列等待者', () => {
      expect(
        dance([
          { name: 'Chen', sex: 'male' },
          { name: 'Julie', sex: 'female' },
          { name: 'Andy', sex: 'male' },
        ])
      ).toEqual({ name: 'Andy', sex: 'male' })
    })

    test('应返回女士队列等待者', () => {
      expect(
        dance([
          { name: 'Chen', sex: 'male' },
          { name: 'Julie', sex: 'female' },
          { name: 'Mai', sex: 'female' },
        ])
      ).toEqual({ name: 'Mai', sex: 'female' })
    })

    test('应返回 undefined', () => {
      expect(
        dance([
          { name: 'Chen', sex: 'male' },
          { name: 'Julie', sex: 'female' },
        ])
      ).toBeUndefined()
    })
  })
})
