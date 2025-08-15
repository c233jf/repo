import { consola } from 'consola'

function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0)
  return date.getDate()
}

consola.log(getLastDayOfMonth(2012, 0))
consola.log(getLastDayOfMonth(2012, 1))
consola.log(getLastDayOfMonth(2013, 1))
