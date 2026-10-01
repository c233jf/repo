const bracketsMap: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
}

export function matching(str: string) {
  const stack: string[] = []

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const bracket = bracketsMap[char]

    if (!bracket) {
      stack.push(char)
    } else {
      const rear = stack.pop()
      if (rear !== bracket) return false
    }
  }

  return !stack.length
}
