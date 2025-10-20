import { consola } from 'consola'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

delay(3000).then(() => consola.info('3 seconds'))
