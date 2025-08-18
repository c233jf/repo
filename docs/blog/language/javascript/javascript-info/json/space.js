import { consola } from 'consola'

const user = {
  name: 'John',
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
}

consola.log(JSON.stringify(user, null, 2))
/**
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
 */
