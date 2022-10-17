import Fuse from 'fuse.js'

export function createFuse<T extends unknown[]>(
  options: Fuse.IFuseOptions<T[number]>,
  params: T
) {
  return new Fuse(params, {
    ...{
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
    },
    ...options,
  })
}
