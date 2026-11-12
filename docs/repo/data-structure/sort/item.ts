export class Item {
  key: number
  other?: Record<string, any>

  constructor(key: number, other?: Record<string, any>) {
    this.key = key
    this.other = other
  }
}
