import { consola } from 'consola'

function getWeekDay(date) {
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
  return days[date.getDay()]
}

const date = new Date(2012, 0, 3)
consola.log(getWeekDay(date))
