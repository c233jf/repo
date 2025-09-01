import { consola } from 'consola'

function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  consola.log(`Called with ${x}`)
  return x
}

function cachingDecorator(func) {
  const cache = new Map()
  return function (x) {
    if (cache.has(x)) {
      // 如果缓存中有对应的结果
      return cache.get(x) // 从缓存中读取结果
    }
    const result = func(x) // 否则就调用 func
    cache.set(x, result) // 然后将结果缓存（记住）下来
    return result
  }
}

const cachedSlow = cachingDecorator(slow)

consola.log(cachedSlow(1)) // cachedSlow(1) 被缓存下来了，并返回结果
consola.log('Again: ' + cachedSlow(1)) // 返回缓存中的 cachedSlow(1) 的结果
