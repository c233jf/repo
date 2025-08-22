import { consola } from 'consola'

const phrase = 'Hello'

// eslint-disable-next-line no-constant-condition
if (true) {
  const user = 'John'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function sayHi() {
    consola.log(`${phrase}, ${user}`)
  }
}

sayHi()
