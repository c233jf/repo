import { consola } from 'consola'

const room = {
  number: 23,
  toJSON() {
    return this.number
  },
}

const meetup = {
  title: 'Conference',
  room,
}

consola.log(JSON.stringify(room)) // 23

consola.log(JSON.stringify(meetup)) // {"title":"Conference","room":23}
