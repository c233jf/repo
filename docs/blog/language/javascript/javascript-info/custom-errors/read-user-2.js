import { consola } from 'consola'

import { PropertyRequiredError } from './property-required-error'

function readUser(json) {
  let user = JSON.parse(json)
  if (!user.age) {
    throw new PropertyRequiredError('age')
  }
  if (!user.name) {
    throw new PropertyRequiredError('name')
  }

  return user
}

try {
  let user = readUser('{ "name": "John" }')
  consola.log(user.name)
} catch (err) {
  if (err instanceof PropertyRequiredError) {
    consola.error('Invalid data: ' + err.message) // Invalid data: No property: age
    consola.error(err.name) // PropertyRequiredError
    consola.error(err.property) // age
  } else if (err instanceof SyntaxError) {
    consola.error('JSON Syntax Error: ' + err.message)
  } else {
    throw err
  }
}
