import { consola } from 'consola'

import { ValidationError } from './validation-error'

function readUser(json) {
  let user = JSON.parse(json)
  if (!user.age) {
    throw new ValidationError('No field: age')
  }
  if (!user.name) {
    throw new ValidationError('No field: name')
  }

  return user
}

try {
  let user = readUser('{ "name": "John" }')
  consola.log(user.name)
} catch (err) {
  if (err instanceof ValidationError) {
    consola.error('Invalid data: ' + err.message) // Invalid data: No field: age
  } else if (err instanceof SyntaxError) {
    consola.error('JSON Syntax Error: ' + err.message)
  } else {
    throw err
  }
}
