import { ValidationError } from './validation-error'

export class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('No property: ' + property)
    this.name = 'PropertyRequiredError'
    this.property = property
  }
}
