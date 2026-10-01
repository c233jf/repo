import { consola } from 'consola'

function aclean(arr) {
  // 这里也可以使用 plain object 来实现，因为键就是字符串
  const map = new Map()
  for (const word of arr) {
    const sorted = word.toLowerCase().split('').sort().join('')
    map.set(sorted, word)
  }
  return Array.from(map.values())
}

const arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares']

consola.log(aclean(arr)) // "nap,teachers,ear" or "PAN,cheaters,era"
