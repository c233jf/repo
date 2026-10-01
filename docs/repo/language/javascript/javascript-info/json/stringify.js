import { consola } from 'consola'

const student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null,
}

const json = JSON.stringify(student)

consola.log(typeof json) // string

consola.log(json) // {"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"spouse":null}
