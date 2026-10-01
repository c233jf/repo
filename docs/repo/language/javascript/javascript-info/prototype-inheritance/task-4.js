import { consola } from 'consola'

// const hamster = {
//   stomach: [],

//   eat(food) {
//     this.stomach.push(food)
//   },
// }

// const speedy = {
//   __proto__: hamster,
// }

// const lazy = {
//   __proto__: hamster,
// }

// // 这只仓鼠找到了食物
// speedy.eat('apple')
// consola.info(speedy.stomach) // apple

// // 这只仓鼠也找到了食物，为什么？请修复它。
// consola.info(lazy.stomach) // apple

const hamster = {
  stomach: [],

  eat(food) {
    this.stomach = [food]
  },
}

const speedy = {
  __proto__: hamster,
}

const lazy = {
  __proto__: hamster,
}

speedy.eat('apple')
consola.info(speedy.stomach) // apple
consola.info(lazy.stomach) // []
