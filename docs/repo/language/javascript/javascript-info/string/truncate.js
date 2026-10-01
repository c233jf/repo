import { consola } from 'consola'

export function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
}

consola.log(truncate("What I'd like to tell on this topic is:", 20))
consola.log(truncate('Hi everyone!', 20))
