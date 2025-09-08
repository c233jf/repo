import { consola } from 'consola'

const head = {
  glasses: 1,
}

const table = {
  pen: 3,
  __proto__: head,
}

const bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
}

const pockets = {
  money: 2000,
  __proto__: bed,
}

consola.info(pockets.pen) // 3
consola.info(bed.glasses) // 1
consola.info(table.money) // undefined
