import { consola } from 'consola'

export function checkSpam(str) {
  const lowerStr = str.toLowerCase()
  return lowerStr.includes('viagra') || lowerStr.includes('xxx')
}

consola.log(checkSpam('buy ViAgRA now'))
consola.log(checkSpam('free xxxxx'))
consola.log(checkSpam('innocent rabbit'))
