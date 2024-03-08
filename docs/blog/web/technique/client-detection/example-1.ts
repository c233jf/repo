// #region client
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
  }
}
// #endregion client

// #region usage
const client = new Client()
client.detect()

if (client.engine.ie) {
  // 针对 IE 的代码。
} else if (client.engine.gecko > 1.5) {
  if (client.engine.version === '1.8.1') {
    // 针对这个版本执行某些操作。
  }
}
// #endregion usage
