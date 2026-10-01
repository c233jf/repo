import { consola } from 'consola'

function getSecondsToTomorrow() {
  const now = new Date()
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  )
  return Math.round((tomorrow - now) / 1000)
}

// or
// function getSecondsToTomorrow() {
//   const now = new Date()
//   const hour = now.getHours()
//   const minutes = now.getMinutes()
//   const seconds = now.getSeconds()
//   const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds
//   const totalSecondsInADay = 86400

//   return totalSecondsInADay - totalSecondsToday
// }

consola.log(getSecondsToTomorrow())
