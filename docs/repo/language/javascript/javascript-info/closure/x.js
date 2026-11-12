import { consola } from 'consola'

// oxlint-disable-next-line @typescript-eslint/no-unused-vars
const x = 1

function func() {
  consola.log(x)

  const x = 2
}

func()
