import { SexType } from '@faker-js/faker'

interface People {
  name: string
  sex: SexType
}

export function dance(peoples: People[]): People | undefined {
  const males: People[] = []
  const females: People[] = []

  for (let i = 0; i < peoples.length; i++) {
    if (peoples[i].sex === 'female') {
      females.push(peoples[i])
    } else {
      males.push(peoples[i])
    }
  }

  while (males.length && females.length) {
    females.shift()
    males.shift()
  }

  return females.length ? females[0] : males[0]
}
