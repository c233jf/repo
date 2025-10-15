import { consola } from 'consola'

class FormatError extends SyntaxError {
  constructor(message) {
    super(message)
    this.name = 'FormatError'
  }
}

const err = new FormatError('Invalid format')

consola.error(err.message) // Invalid format
consola.error(err.name) // FormatError
consola.error(err.stack) // 一个嵌套调用的列表，每个调用都有对应的行号

consola.info(err instanceof FormatError) // true
consola.info(err instanceof SyntaxError) // true
