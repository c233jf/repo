// #region client
const UA = window.navigator.userAgent
const ENGINES = [
  // webkit
  [/AppleWebKit\/(\S+)/, 'webkit'],
  // khtml
  [/KHTML\/(\S+)|Konqueror\/([^;]+)/, 'khtml', 'konqueror'],
  // gecko
  [/rv:([^)]+)\) Gecko\/\d{8}/, 'gecko'],
  // ie
  [/MSIE ([^;]+)/, 'ie', 'ie'],
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

  browser = {
    ie: 0,
    firefox: 0,
    safari: 0,
    konqueror: 0,
    opera: 0,
    chrome: 0,
    // 完整的版本号。
    version: '',
  }

  detect() {
    // 检测渲染引擎和浏览器。
    if (window.opera) {
      this.engine.version = this.browser.version = window.opera.version()
      this.engine.opera = this.browser.opera = parseFloat(this.engine.version)
    } else {
      let matches: string[] | null = null

      ENGINES.some((reg) => {
        matches = reg[0].exec(UA)
        if (matches) {
          this.engine.version = matches[1] || matches[2]
          this.engine[reg[1]] = parseFloat(this.engine.version)

          // 绝大多数浏览器与其渲染引擎的版本号密切相关。
          if (reg[2]) {
            this.browser.version = this.engine.version
            this.browser[reg[2]] = this.engine[reg[1]]
          }

          if (reg[1] === 'webkit') {
            // 确定是 Chrome 还是 Safari。
            if ((matches = /Chrome\/(\S+)/.exec(UA))) {
              this.browser.version = matches[1]
              this.browser.chrome = parseFloat(this.browser.version)
            } else if ((matches = /Version\/(\S+)/.exec(UA))) {
              // 适用于 Safari 3+。
              this.browser.version = matches[1]
              this.browser.safari = parseFloat(this.browser.version)
            }
          } else if (
            reg[1] === 'gecko' &&
            (matches = /Firefox\/(\S+)/.exec(UA))
          ) {
            // 确定是 Firefox。
            this.browser.version = matches[1]
            this.browser.firefox = parseFloat(this.browser.version)
          }

          return true
        }
      })
    }
  }
}
// #endregion client

// #region usage
const client = new Client()
client.detect()

if (client.engine.webkit) {
  if (client.browser.chrome) {
    console.log('Chrome ' + client.browser.chrome)
  } else if (client.browser.safari) {
    console.log('Safari ' + client.browser.safari)
  }
} else if (client.engine.gecko) {
  if (client.browser.firefox) {
    console.log('Firefox ' + client.browser.firefox)
  } else {
    console.log('Other Gecko')
  }
}
// #endregion usage
