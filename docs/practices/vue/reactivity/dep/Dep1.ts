import { Effect, activeEffect } from '../watch'

export class Dep {
  subscribers = new Set<Effect>()

  depend() {
    if (activeEffect) this.subscribers.add(activeEffect)
  }

  notify() {
    this.subscribers.forEach((e) => {
      e()
    })
  }
}
