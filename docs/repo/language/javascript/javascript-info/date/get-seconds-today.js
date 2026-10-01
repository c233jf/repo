import { consola } from 'consola'

function getSecondsToday() {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((now - today) / 1000)
}

// or
// function getSecondsToday() {
//   const d = new Date()
//   return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()
// }

consola.log(getSecondsToday())
