import { consola } from 'consola'

const str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

const meetup = JSON.parse(str, (key, value) => {
  return key === 'date' ? new Date(value) : value
})

consola.log(meetup.date.getDate()) // 30
