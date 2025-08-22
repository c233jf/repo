import { consola } from 'consola'

function inBetween(a, b) {
  return function (x) {
    return x >= a && x <= b
  }
}

function inArray(arr) {
  return function (x) {
    return arr.includes(x)
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7]

consola.log(arr.filter(inBetween(3, 6)))
consola.log(arr.filter(inArray([1, 2, 10])))
