import { consola } from 'consola'

const meetup = {
  title: 'Conference',
  room: {
    number: 23,
    participants: ['john', 'ann'],
  },
}

consola.log(JSON.stringify(meetup)) // {"title":"Conference","room":{"number":23,"participants":["john","ann"]}}
