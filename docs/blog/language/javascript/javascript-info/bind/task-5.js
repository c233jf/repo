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
  login(result) {
    consola.log(this.name + (result ? ' logged in' : ' failed to log in'))
  },
}

askPassword(user.login.bind(user, true), user.login.bind(user, false))
