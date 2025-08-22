import { consola } from 'consola'

function makeWorker() {
  const name = 'Pete'

  return function () {
    consola.log(name)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const name = 'John'

const work = makeWorker()

work()
