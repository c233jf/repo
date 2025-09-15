import { consola } from 'consola'

export class Animal {
  constructor(name) {
    this.name = name
  }

  run(speed) {
    this.speed = speed
    consola.info(`${this.name} runs with speed ${speed}`)
  }

  stop() {
    this.speed = 0
    consola.info(`${this.name} stands still`)
  }
}
