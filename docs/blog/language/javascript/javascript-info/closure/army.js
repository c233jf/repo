import { consola } from 'consola'

function makeArmy() {
  const shooters = []
  let i = 0

  while (i < 10) {
    const shooter = function () {
      consola.log(i)
    }
    shooters.push(shooter)
    i++
  }

  return shooters
}

const army = makeArmy()

army[0]()
army[5]()

function makeArmy2() {
  const shooters = []

  for (let i = 0; i < 10; i++) {
    const shooter = function () {
      consola.log(i)
    }
    shooters.push(shooter)
  }

  return shooters
}

const army2 = makeArmy2()

army2[0]()
army2[5]()
