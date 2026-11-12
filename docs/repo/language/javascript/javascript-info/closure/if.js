import { consola } from 'consola'

const phrase = 'Hello'

// oxlint-disable-next-line no-constant-condition
if (true) {
  const user = 'John'

  // oxlint-disable-next-line @typescript-eslint/no-unused-vars
  function sayHi() {
    consola.log(`${phrase}, ${user}`)
  }
}

sayHi()
