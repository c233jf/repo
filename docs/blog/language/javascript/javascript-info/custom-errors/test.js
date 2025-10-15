import { consola } from 'consola'

import { ValidationError } from './validation-error'

function test() {
  throw new ValidationError('Invalid value')
}

try {
  test()
} catch (error) {
  consola.error(error.message) // Invalid value
  consola.error(error.name) // ValidationError
  consola.error(error.stack) // 一个嵌套调用的列表，每个调用都有对应的行号
}
