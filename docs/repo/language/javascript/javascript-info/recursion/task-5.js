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

function printReverseList(list) {
  if (list.next) {
    printReverseList(list.next)
  }
  consola.log(list.value)
}

printReverseList(list)

function printReverseList2(list) {
  let current = list
  const arr = []
  while (current) {
    arr.push(current.value)
    current = current.next
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    consola.log(arr[i])
  }
}

printReverseList2(list)
