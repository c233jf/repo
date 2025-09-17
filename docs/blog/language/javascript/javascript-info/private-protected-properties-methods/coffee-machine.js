import { consola } from 'consola'

class CoffeeMachine {
  _waterAmount = 0 // 内部的水量
  #waterLimit = 200

  constructor(power) {
    this._power = power
  }

  get power() {
    return this._power
  }

  set waterAmount(value) {
    if (value < 0) {
      value = 0
    }
    this._waterAmount = value
  }

  get waterAmount() {
    return this._waterAmount
  }

  #fixWaterAmount(value) {
    if (value < 0) return 0
    if (value > this.#waterLimit) return this.#waterLimit
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value)
  }
}

// 创建咖啡机
const coffeeMachine = new CoffeeMachine(100)

consola.info(`Power is: ${coffeeMachine.power}W`) // Power is: 100W

// coffeeMachine.power = 200 // Error: Cannot set property power of #<CoffeeMachine> which has only a getter

// 加水
coffeeMachine.waterAmount = -10
