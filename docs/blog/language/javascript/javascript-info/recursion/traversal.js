import { consola } from 'consola'

const company = {
  sales: [
    { name: 'John', salary: 1000 },
    { name: 'Alice', salary: 1600 },
  ],
  development: {
    sites: [
      { name: 'Peter', salary: 2000 },
      { name: 'Alex', salary: 1800 },
    ],
    internals: [{ name: 'Jack', salary: 1300 }],
  },
}

function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0)
  }
  let sum = 0
  for (const subdep of Object.values(department)) {
    sum += sumSalaries(subdep)
  }
  return sum
}

consola.log(sumSalaries(company)) // 7700
