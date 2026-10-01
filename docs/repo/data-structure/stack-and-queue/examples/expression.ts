const operators = ['+', '-', '*', '/', '(', ')', ';']

export function precede(operator1: string, operator2: string) {
  switch (operator1) {
    case '+':
    case '-':
      return operators.slice(2, 5).includes(operator2) ? '<' : '>'
    case '*':
    case '/':
      return operator2 === '(' ? '<' : '>'
    case '(':
      return operator2 === ')' ? '=' : operator2 === ';' ? '' : '<'
    case ')':
      return operator2 === '(' ? '' : '>'
  }
}

export function arithmetic(expression: string) {
  const opnd: number[] = [] // 操作数栈
  const optr: string[] = [] // 运算符栈
  let tmp = ''

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i]
    if (!operators.includes(char)) {
      // opnd.push(+char)
      tmp += char
      continue
    }

    if (tmp) {
      opnd.push(+tmp)
      tmp = ''
    }

    if (!optr.length) {
      optr.push(char)
      continue
    }

    let operator = ''
    let opnd1 = 0
    let opnd2 = 0

    switch (precede(optr.at(-1)!, char)) {
      case '<':
        optr.push(char)
        break
      case '>':
        operator = optr.pop()!
        opnd1 = +opnd.pop()!
        opnd2 = +opnd.pop()!
        opnd.push(eval(`${opnd2}${operator}${opnd1}`))
        if (optr.length) {
          i-- // 不要读取下一个字符
        }
        break
      case '=':
        optr.pop()
        break

      default:
        return NaN
    }
  }

  return opnd.at(-1)
}
