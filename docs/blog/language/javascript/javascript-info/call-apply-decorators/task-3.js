export function debounce(f, ms) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => f.apply(this, args), ms)
  }
}
