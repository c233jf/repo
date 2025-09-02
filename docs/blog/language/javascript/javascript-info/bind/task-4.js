import { consola } from 'consola'

async function askPassword(ok, fail) {
  const password = await consola.prompt('Password?', {
    type: 'text',
  })
  if (password === 'rockstar') ok()
  else fail()
}

const user = {
  name: 'John',
  loginOk() {
    consola.log(`${this.name} logged in`)
  },
  loginFail() {
    consola.log(`${this.name} failed to log in`)
  },
}

askPassword(user.loginOk.bind(user), user.loginFail.bind(user))
