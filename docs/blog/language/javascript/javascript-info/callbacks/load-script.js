export function loadScript(src, callback) {
  const script = document.createElement('script')
  script.src = src
  script.onload = () => {
    callback(null, script)
  }
  script.onerror = () => {
    callback(new Error(`Failed to load script ${src}`))
  }
  document.body.appendChild(script)
}
