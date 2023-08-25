import { Effect, activeEffect } from '../watch'

export class Dep {
  subscribers = new Set<Effect>()

  constructor(private _value: any) {}

  get value() {
    this.depend()
    return this._value
  }

  set value(v) {
    this._value = v
    this.notify()
  }

  depend() {
    if (activeEffect) this.subscribers.add(activeEffect)
  }

  notify() {
    this.subscribers.forEach((e) => {
      e()
    })
  }
}
