import { consola } from 'consola'

const room = {
  number: 23,
}

const meetup = {
  title: 'Conference',
  date: new Date(Date.UTC(2017, 0, 1)),
  room,
}

consola.log(JSON.stringify(meetup)) // {"title":"Conference","date":"2017-01-01T00:00:00.000Z","room":{"number":23}}
