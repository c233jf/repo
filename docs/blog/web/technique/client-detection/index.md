# 客户端检测

由于浏览各种普遍的不一致性问题，Web 开发者常会使用各种客户端检测方法来突破或规避种种限制。

客户端检测的方法有很多，各有利弊。重要的是要知道，仅在逼不得已的时候才使用客户端检测。优先使用最通用的方案，然后再使用特定于浏览器的技术增强该方案。

## 能力检测

**能力检测**（又称**特性检测**）是最常用的客户端检测方式。模式如下：

```js
if (object.propertyInQuestion) {
  // 使用 object.propertyInQuestion。
}
```

例如，IE5.0 之前的版本不支持 `document.getElementById()`。但可以使用非标准的 `document.all` 属性实现相同目的。

```js
function getElement(id) {
  if (document.getElementById) {
    return document.getElementById(id)
  } else if (document.all) {
    return document.all[id]
  } else {
    throw new Error('Cannot retrieve element!')
  }
}
```

能力检测的两个重要概念：

- 先检测达成目的的最常用特性。这样可以保证代码最优化，因为在多数情况下可以避免判断多个条件；
- 必须检测实际用到的特性。一个特性存在不意味着另一个特性必定存在。

```js
function getWindowWidth() {
  if (document.all) {
    // 假设是 IE。
    return document.documentElement.clientWidth // 错误用法，这里需要判断该属性是否存在。
  } else {
    return window.innerWidth
  }
}
```

这是一个错误使用能力检测的例子。IE8 及之前的版本确实不支持 `window.innerWidth`。但是 `document.all` 存在不意味着浏览器就是 IE，还有可能是 Opera。实际上 Opera 同时支持 `document.all` 和 `window.innerWidth`。

### 更可靠的能力检测

上面的例子中通过检测对象中是否存在该属性来判断能否使用该特性，有些时候仅做这样的判断还不够。例如：

```js
function isSortable(obj) {
  return !!obj.sort
}
```

这个函数通过检测对象中是否存在 `sort()` 方法，来判断对象是否支持排序。但问题是，假若对象中存在 `sort` 属性的话，该函数也会返回 `true`。这显然不符合我们的要求，更好的方式是检测 `sort` 是否是一个函数。

```js
function isSortable(obj) {
  return typeof obj.sort === 'function'
}
```

应该尽可能使用 `typeof` 进行能力检测。

::: info
如果你需要兼容 IE 浏览器，那么你需要注意以下问题。

```js
function hasCreateElement() {
  return typeof document.createElement === 'function'
}
```

上述函数在 IE8 及以前返回 `false`，因为 `typeof document.createElement` 的值是 `object`。这是因为 DOM 对象是宿主对象，而 IE8 及以前的宿主对象是通过 COM 实现的。因此 `document.createElement` 是 COM 对象，所以使用 `typeof` 才会返回 `object`。IE9 纠正了这个问题，对所有 DOM 方法都返回 `function`。
:::

### 能力检测，不是浏览器检测

检测一个或几个特性并不能确定浏览器。让我们看下错误的例子。

```js
// 还不够具体！
const isFirefox = !!(navigator.vendor && navigator.vendorSub)
// 假设过头了！
const isIE = !!(document.all && document.uniqueID)
```

这两行代码是对能力检测的典型误用。以前，确实可以通过 `navigator.vendor && navigator.vendorSub` 确定 Firefox 浏览器。但是，现在 Safari 也实现了相同的属性。检测 IE 的代码中通过检测 `document.all && document.uniqueID` 来确定是否是 IE。这假设了 IE 将来的版本中仍然存在这两个属性，同时其它浏览器不存在这两个属性。

实际上，根据浏览器不同将能力组合起来是更好的方式。如果你需要使用某些特定浏览器特性，那最好一次性检测所有相关特性。

```js
// 确定浏览器是否支持 Netscape 风格的插件。
const hasNSPlugins = !!navigator.plugins?.length
```

::: tip
在实际开发中，应该将能力检测作为下一步解决方案的依据，而不是用来判断用户使用的浏览器。
:::

## 用户代理检测

**用户代理检测**通过检测用户代理字符串来确定用户实际使用的浏览器。该字符串可以通过 `navigator.userAgent` 访问。在服务器端，用户代理检测是一种常用且广为接受的做法。而在客户端，用户代理检测一般被当作一种万不得已才用的做法，其优先级在能力检测之后。

### 用户代理字符串检测技术

考虑到历史原因和现代浏览器中用户代理字符串的使用方式。通过用户代理字符串来检测特定的浏览器并不是一件轻松的事。首先要确定你需要多具体的浏览器信息。一般情况下，知道渲染引擎和最低限度的版本就足以决定正确的操作方法。

#### 识别渲染引擎

如果某些浏览器使用相同版本的渲染引擎，那么它们一定支持相同的特性。

检测脚本代码如下：

<<< ./example-1.ts#client

`engine` 对象保存了浏览器和渲染引擎及其对应的版本号。如果检测到了哪个浏览器或渲染引擎，则以浮点数的形式将其版本号写入相对应的属性。完整的版本号则写入 `version` 属性。这样，我们就可以如下使用代码：

<<< ./example-1.ts#usage

要正确地进行检测，关键是检测顺序要正确。由于用户代理字符串存在诸多不一致的地方，如果检测顺序不对，很可能会导致检测结果错误。由于 Opera 的用户代理字符串有可能完全模仿其它浏览器，所以我们需要首先检测它。

如上所述，因为 Opera 的用户代理字符串不一定有描述其自己的信息，所以我们不能通过检测其用户代理字符串去识别它。但是，Opera 5 及更高版本中增加了 `window.opera` 对象，所以我们可以通过检测该对象是否存在来确定浏览器是否是 Opera。而且，Opera 7.6 及更高版本中，我们可以通过调用 `window.opera.version()` 方法获取浏览器版本，这也是确定 Opera 版本号的最佳方式。（PS：虽然早期的 Opera 的用户代理字符串不会模仿其它浏览器，我们可以通过检测其用户代理字符串来识别它。但是，到了 2007 年底，Opera 的最高版本已经是 9.5 了，应该没有多少人还在使用古老的版本，所以在此不考虑。）

```js
if (window.opera) {
  this.engine.version = window.opera.version()
  this.engine.opera = parseFloat(this.engine.version)
}
```

第二个要检测的是 WebKit。因为 WebKit 的用户代理字符串中包含了“Gecko”和“KHTML”两个字符串，如果先检测它们，会出现错误的结论。WebKit 的用户代理字符串中的“AppleWebKit”是独一无二的，因此我们可以通过检测这个字符串来识别引擎是否是 WebKit。

```js{1-3,8-11}
const ua = navigator.userAgent
const webkitRegExp = /AppleWebKit\/(\S+)/
let matches = []

if (window.opera) {
  this.engine.version = window.opera.version()
  this.engine.opera = parseFloat(this.engine.version)
} else if ((matches = webkitRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.webkit = parseFloat(this.engine.version)
}
```

第三个要检测的是 KHTML。因为 KHTML 的用户代理字符串同样也包含“Gecko”，在排除 KHTML 之前，无法准确检测 Gecko。需要注意的是 Konqueror 3.1 及更早版本中的用户代理字符串不包含 KHTML，我们需要使用 Konqueror 的版本替代。

```js{3,12-15}
const ua = navigator.userAgent
const webkitRegExp = /AppleWebKit\/(\S+)/
const khtmlRegExp = /KHTML\/(\S+)|Konqueror\/([^;]+)/
let matches = []

if (window.opera) {
  this.engine.version = window.opera.version()
  this.engine.opera = parseFloat(this.engine.version)
} else if ((matches = webkitRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.webkit = parseFloat(this.engine.version)
} else if ((matches = khtmlRegExp.exec(ua))) {
  this.engine.version = matches[1] || matches[2]
  this.engine.khtml = parseFloat(this.engine.version)
}
```

现在我们可以安全准确地检测 Gecko 了。但是，在 Gecko 的用户代理字符串中，Gecko 的版本号是在字符串“rv:”的后面，而不是 Gecko 的后面。

```js{4,16-19}
const ua = navigator.userAgent
const webkitRegExp = /AppleWebKit\/(\S+)/
const khtmlRegExp = /KHTML\/(\S+)|Konqueror\/([^;]+)/
const geckoRegExp = /rv:([^)]+)\) Gecko\/\d{8}/
let matches = []

if (window.opera) {
  this.engine.version = window.opera.version()
  this.engine.opera = parseFloat(this.engine.version)
} else if ((matches = webkitRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.webkit = parseFloat(this.engine.version)
} else if ((matches = khtmlRegExp.exec(ua))) {
  this.engine.version = matches[1] || matches[2]
  this.engine.khtml = parseFloat(this.engine.version)
} else if ((matches = geckoRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.gecko = parseFloat(this.engine.version)
}
```

最后一个要检测的就是 IE 了。IE 的版本号位于“MSIE”后面，一个分号的前面。

```js{5,20-23}
const ua = navigator.userAgent
const webkitRegExp = /AppleWebKit\/(\S+)/
const khtmlRegExp = /KHTML\/(\S+)|Konqueror\/([^;]+)/
const geckoRegExp = /rv:([^)]+)\) Gecko\/\d{8}/
const ieRegExp = /MSIE ([^;]+)/
let matches = []

if (window.opera) {
  this.engine.version = window.opera.version()
  this.engine.opera = parseFloat(this.engine.version)
} else if ((matches = webkitRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.webkit = parseFloat(this.engine.version)
} else if ((matches = khtmlRegExp.exec(ua))) {
  this.engine.version = matches[1] || matches[2]
  this.engine.khtml = parseFloat(this.engine.version)
} else if ((matches = geckoRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.gecko = parseFloat(this.engine.version)
} else if ((matches = ieRegExp.exec(ua))) {
  this.engine.version = matches[1]
  this.engine.ie = parseFloat(this.engine.version)
}
```

完整的代码如下：

<<< ./example-1-opt.ts

#### 识别浏览器

大多数情况下，识别了渲染引擎就足以为我们采取正确的操作提供依据了。但是，只有渲染引擎还不能说明存在所需的 JS 功能。例如，Safari 和 Chrome 都使用 WebKit 作为渲染引擎，但是它们的 JS 引擎不一样。所以，我们需要为 `Client` 类添加一些新的属性。

<<< ./example-2.ts#client{6,10,24-33,38-39,49-72}

用法：

<<< ./example-2.ts#usage

#### 识别移动设备

有时候我们需要识别我们的网站是否运行在移动设备上。例如，在移动设备上访问 PC 的网站，这时候我们就应该自动跳转至适合移动设备访问的网站。

<<< ./example-3.ts#client{34-43,45-50,52,94,96-137}

用法：

<<< ./example-3.ts#usage

## 总结

用户代理检测是客户端检测的最后一个选择。只要可能，都应该优先采用能力检测和怪癖检测。

用户代理检测使用场景：

- 不能准确地使用能力检测和怪癖检测。例如，某些浏览器实现了为将来功能预留的存根（stub）函数。在这种情况下，仅测试相应函数是否存在不能解决实际问题。
- 同一款浏览器在不同平台拥有不同能力。这时候就需要确定浏览器处于哪个平台下。

## References

- JavaScript 高级程序设计（第 3 版）第 9 章
- [实现特性检测](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection)
