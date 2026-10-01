import { consola } from 'consola'

const salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
}

function topSalary(salaries) {
  let max = 0
  let maxName = null
  for (const [name, salary] of Object.entries(salaries)) {
    if (salary > max) {
      max = salary
      maxName = name
    }
  }
  return maxName
}

consola.log(topSalary(salaries)) // Pete
