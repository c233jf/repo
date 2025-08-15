import { consola } from 'consola'

function getDateAgo(date, days) {
  const dateCopy = new Date(date)
  dateCopy.setDate(date.getDate() - days)
  return dateCopy.getDate()
}

const date = new Date(2015, 0, 2)
consola.log(getDateAgo(date, 1))
consola.log(getDateAgo(date, 2))
consola.log(getDateAgo(date, 365))
