import { consola } from 'consola'

function getLocalDay(date) {
  const day = date.getDay()
  if (day === 0) {
    return 7
  }
  return day
}

const date = new Date(2012, 0, 3)
consola.log(getLocalDay(date))
