import { consola } from 'consola'

const map = new Map()

map.set('name', 'John')

const keys = Array.from(map.keys())

keys.push('more')

consola.log(keys) // name, more
