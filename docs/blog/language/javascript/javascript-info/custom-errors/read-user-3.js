import { consola } from 'consola'

import { PropertyRequiredError } from './property-required-error'
import { ReadError } from './read-error'
import { ValidationError } from './validation-error'

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError('age')
  }
  if (!user.name) {
    throw new PropertyRequiredError('name')
  }
}

function readUser(json) {
  let user

  try {
    user = JSON.parse(json)
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError('Syntax Error', err)
    } else {
      throw err
    }
  }

  try {
    validateUser(user)
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError('Validation Error', err)
    } else {
      throw err
    }
  }

  return user
}

try {
  readUser('{bad json}')
} catch (err) {
  if (err instanceof ReadError) {
    consola.error(err)
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    consola.error('Original error: ' + err.cause)
  } else {
    throw err
  }
}
