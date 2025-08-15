import { consola } from 'consola'

function formatDate(date) {
  const d = new Date(date)

  const diffMs = new Date() - d
  if (diffMs < 1000) {
    return 'right now'
  }

  const diffSec = Math.round(diffMs / 1000)
  if (diffSec < 60) {
    return `${diffSec} sec. ago`
  }

  const diffMin = Math.round(diffSec / 60)
  if (diffMin < 60) {
    return `${diffMin} min. ago`
  }

  const diffHour = Math.round(diffMin / 60)
  if (diffHour < 24) {
    return `${diffHour} h. ago`
  }

  // 格式化 date
  // 将前置 0 加到一位数 day/month/hours/minutes 前
  const array = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes(),
  ].map((component) => component.slice(-2)) // 得到每个组件的后两位

  // 将时间信息和日期组合在一起
  return array.slice(0, 3).join('.') + ' ' + array.slice(3).join(':')
}

consola.log(formatDate(new Date(new Date() - 1)))
consola.log(formatDate(new Date(new Date() - 30 * 1000)))
consola.log(formatDate(new Date(new Date() - 5 * 60 * 1000)))
consola.log(formatDate(new Date(new Date() - 86400 * 1000)))
