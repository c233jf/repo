const UA = window.navigator.userAgent
const ENGINES = [
  // webkit
  [/AppleWebKit\/(\S+)/, 'webkit'],
  // khtml
  [/KHTML\/(\S+)|Konqueror\/([^;]+)/, 'khtml'],
  // gecko
  [/rv:([^)]+)\) Gecko\/\d{8}/, 'gecko'],
  // ie
  [/MSIE ([^;]+)/, 'ie'],
] as const

export class Client {
  engine = {
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    // 完整的版本号。
    version: '',
  }

  detect() {
    // 检测渲染引擎和浏览器。
    if (window.opera) {
      this.engine.version = window.opera.version()
      this.engine.opera = parseFloat(this.engine.version)
    } else {
      let matches: string[] | null = null

      ENGINES.some((reg) => {
        matches = reg[0].exec(UA)
        if (matches) {
          this.engine.version = matches[1] || matches[2]
          this.engine[reg[1]] = parseFloat(this.engine.version)
          return true
        }
      })
    }
  }
}
