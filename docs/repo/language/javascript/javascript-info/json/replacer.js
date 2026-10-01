import { consola } from 'consola'

const room = {
  number: 23,
}

const meetup = {
  title: 'Conference',
  participants: [{ name: 'John' }, { name: 'Alice' }],
  place: room, // meetup 引用了 room
}

room.occupiedBy = meetup

consola.log(JSON.stringify(meetup, ['title', 'participants'])) // {"title":"Conference","participants":[{},{}]}

consola.log(
  JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']),
) // {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}

consola.log(
  JSON.stringify(meetup, (key, value) => {
    consola.log(`${key}: ${value}`)
    return key === 'occupiedBy' ? undefined : value
  }),
) // {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}
