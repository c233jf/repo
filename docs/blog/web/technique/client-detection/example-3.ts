// #region client
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

  platform = {
    // 移动设备。
    iphone: false,
    ipod: false,
    ipad: false,
    ios: 0,
    android: 0,
    nokiaN: false,
    winMobile: false,
  }

  constructor(public ua = window.navigator.userAgent) {}

  detectAll() {
    this.detectEngineAndBrowser()
    this.detectMobile()
  }

  detectEngineAndBrowser() {
    if (window.opera) {
      this.engine.version = this.browser.version = window.opera.version()
      this.engine.opera = this.browser.opera = parseFloat(this.engine.version)
    } else {
      let matches: string[] | null = null

      ENGINES.some((reg) => {
        matches = reg[0].exec(this.ua)
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
            if ((matches = /Chrome\/(\S+)/.exec(this.ua))) {
              this.browser.version = matches[1]
              this.browser.chrome = parseFloat(this.browser.version)
            } else if ((matches = /Version\/(\S+)/.exec(this.ua))) {
              // 适用于 Safari 3+。
              this.browser.version = matches[1]
              this.browser.safari = parseFloat(this.browser.version)
            }
          } else if (
            reg[1] === 'gecko' &&
            (matches = /Firefox\/(\S+)/.exec(this.ua))
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

  detectMobile() {
    this.platform.iphone = this.ua.includes('iPhone')
    this.platform.ipod = this.ua.includes('iPod')
    this.platform.ipad = this.ua.includes('iPad')
    this.platform.nokiaN = this.ua.includes('NokiaN')
    this.platform.winMobile = this.ua.includes('IEMobile')
    this.platform.ios = this.getIOSVersion()
    this.platform.android = this.getAndroidVersion()
  }

  getIOSVersion() {
    if (!this.isIOS()) return 0

    /**
     * 在 IOS 3 之前，ua 中只包含“CPU like Mac OS”。
     * 后来 iPhone 中改成了“CPU iPhone OS 3_0 like Mac OS X”。
     * iPad 中改成了“CPU OS 3_2 like Mac OS X”。
     */
    const matches = this.ua.match(/OS (\d+_\d+)/)
    if (matches) {
      return parseFloat(matches[1].replace('_', '.')) // 3_2 => 3.2
    } else {
      return 2 // 不能真正检测出来，只能猜测。
    }
  }

  getAndroidVersion() {
    if (!this.isAndroid()) return 0

    // 所有 Android 版本的 ua 都包含版本号。
    const matches = this.ua.match(/Android (\d+\.\d+)/)!
    return parseFloat(matches[1])
  }

  isIOS() {
    return this.ua.includes('Mac') && this.ua.includes('Mobile')
  }

  isAndroid() {
    return this.ua.includes('Android')
  }
}
// #endregion client

// #region usage
const client = new Client()
client.detectAll()

if (client.engine.webkit) {
  if (client.platform.ios) {
    console.log('ios')
  } else if (client.platform.android) {
    console.log('android')
  }
}
// #endregion usage
