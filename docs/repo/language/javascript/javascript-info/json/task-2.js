import { consola } from 'consola'

const room = {
  number: 23,
}

const meetup = {
  title: 'Conference',
  occupiedBy: [{ name: 'John' }, { name: 'Alice' }],
  place: room,
}

// 循环引用
room.occupiedBy = meetup
meetup.self = meetup

consola.log(
  JSON.stringify(meetup, function (key, value) {
    return key !== '' && value === meetup ? undefined : value
  }),
)
