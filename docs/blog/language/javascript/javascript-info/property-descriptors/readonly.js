const user = {
  name: 'John',
}

Object.defineProperty(user, 'name', {
  writable: false,
})

user.name = 'Jane' // Error: Cannot assign to read only property 'name'
