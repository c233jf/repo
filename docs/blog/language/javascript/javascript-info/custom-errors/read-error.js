export class ReadError extends Error {
  constructor(message, cause) {
    super(message)
    this.name = 'ReadError'
    this.cause = cause
  }
}
