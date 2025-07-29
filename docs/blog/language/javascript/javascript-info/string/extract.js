import { consola } from 'consola'

export function extractCurrencyValue(str) {
  return +str.slice(1)
}

consola.log(extractCurrencyValue('$120'))
