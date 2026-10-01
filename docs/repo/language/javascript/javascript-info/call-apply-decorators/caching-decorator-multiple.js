import { consola } from 'consola'

const worker = {
  slow(min, max) {
    consola.log(`Called with ${min}, ${max}`)
    return min + max
  },
}

function cachingDecorator(func, hash) {
  const cache = new Map()
  return function (...args) {
    const key = hash(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = func.apply(this, args)
    cache.set(key, result)
    return result
  }
}

function hash(args) {
  return args.join(',')
}

worker.slow = cachingDecorator(worker.slow, hash)

consola.log(worker.slow(3, 5))
consola.log('Again: ' + worker.slow(3, 5))
