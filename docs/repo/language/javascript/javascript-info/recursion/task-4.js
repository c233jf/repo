import { consola } from 'consola'

const list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
}

function printList(list) {
  let current = list
  while (current) {
    consola.log(current.value)
    current = current.next
  }
}

printList(list)

function printList2(list) {
  consola.log(list.value)
  if (list.next) {
    printList2(list.next)
  }
}

printList2(list)
