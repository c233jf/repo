# 语言规范

## HTML

### DOCTYPE

**必须**使用 H5 的文档声明：`<!DOCTYPE html>`。更多 DOCTYPE 声明参考此 [文档](https://www.w3.org/TR/2014/REC-html5-20141028/syntax.html#the-doctype)。

### 页面 lang

lang 值**应该**遵循该文档 [BCP 47 - Tags for Identifying Languages](http://tools.ietf.org/html/bcp47)。

虽然文档推荐使用 `cmn-Hans-CN`，但是考虑浏览器和操作系统的兼容性，仍然使用 `zh-CN`：`<html lang="zh-CN">`。

参考：

- [html 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html#%E6%97%A0%E9%9A%9C%E7%A2%8D%E8%80%83%E8%99%91)
- [IANA Language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
- [W3C Language tags in HTML and XML](http://www.w3.org/International/articles/language-tags/)
- [网页头部的声明应该是用 lang=”zh” 还是 lang=”zh-cn”？](http://www.zhihu.com/question/20797118?utm_source=weibo&utm_medium=weibo_share&utm_content=share_question&utm_campaign=share_sidebar)

### charset

**必须**使用“UTF-8”编码：`<meta charset="UTF-8">`。

参考：

- [UTF8 or UTF-8?](http://stackoverflow.com/questions/809620/utf8-or-utf-8)
- [Application of IANA Charset Registration for GBK](http://www.ietf.org/assignments/charset-reg/GBK)
- [character-encoding-declaration](http://www.w3.org/TR/html5/document-metadata.html#character-encoding-declaration)

### input

如果你想要纯数字输入框，可以使用 `type="tel"` 和 `type="number"`。具体区别参考 [input 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B)。

### meta

**移动端**：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
    />

    <!-- Apple 专用 meta -->

    <!-- 自动识别页面中有可能是电话格式的数字 -->
    <!-- iOS中的 Safari 会默认识别与电话格式相似的数字并生成一个可以拉起电话应用并将该数字作为电话号码拨打的链接。定义 telephone=no 可以屏蔽该功能 -->
    <meta name="format-detection" content="telephone=no" />

    <!-- 设置 WebApp 是否进入全屏模式，该设置需要添加到主屏幕才生效 -->
    <!-- 默认使用 Safari 显示 web 内容 -->
    <!-- 通过检测 window.navigator.standalone 的只读 Boolean 值可以判断 web 应用是否处于全屏模式 -->
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <!-- 为 webapp 设置状态栏样式 -->
    <!-- 此设置只在上方设置了全屏模式才起效 -->
    <!-- 如果 content 值是 default，状态栏表现如常，默认值是 default -->
    <!-- content=”black”，状态栏背景黑色，网页内容在状态栏下面 -->
    <!-- content=”black-translucent”，状态栏半透明，背景黑色，网页内容占满全屏 -->
    <!-- 该设置在 iOS6 和 iOS7 表现还可以，但到了 iOS8 后会出现各种问题，而且在 iOS9 中并没有生效。 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <!-- Apple 专用 meta -->

    <title>适用于移动端的 meta</title>
  </head>
  <body></body>
</html>
```

参考：

- [Configuring the Viewport](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW19)
- [Safari HTML Reference](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)
- [iOS 8: web app status bar position and resizing problems](http://stackoverflow.com/questions/25884806/ios-8-web-app-status-bar-position-and-resizing-problems)
- [Configuring Web Applications](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW4)

**PC**：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="keywords" content="your keywords" />
    <meta name="description" content="your description" />
    <meta name="author" content="author,email address" />
    <meta name="robots" content="index,follow" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="renderer" content="ie-stand" />
    <title>适用于 PC 端的 meta</title>
  </head>
  <body></body>
</html>
```

## CSS

**必须**遵循 [BEM](https://getbem.com/)。

**推荐**使用 CSS 框架替代 CSS 预处理器，例如：[UnoCSS](https://unocss.dev/)。

### 属性顺序

1. 布局定位属性：display / position / float / clear / visibility / overflow；
2. 尺寸属性：width / height；
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word；
4. 自身属性：background / padding / margin / border；
5. 其它属性：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

### CSS3 浏览器私有前缀写法

私有前缀的属性名在前，标准属性名在后：

```css
.prefix {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

参考：

- [#Vendor-specific extensions](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#vendor-keywords)

### 媒体查询

- 设备尺寸参考：[Mobile devices](http://mydevice.io/devices/)
- 媒体查询类型浏览器支持情况：[CSS3 Media Queries overview](http://cssmediaqueries.com/overview.html)

**常用查询语句**

判断设备横竖屏：

```css
/* 横屏 */
@media all and (orientation: landscape) {
}

/* 竖屏 */
@media all and (orientation: portrait) {
}
```

判断设备宽高：

```css
/* 设备宽度大于 320px 小于 640px */
@media all and (min-width: 320px) and (max-width: 640px) {
}
```

判断设备像素比：

```css
/* 设备像素比为 1 */
@media only screen and (-webkit-min-device-pixel-ratio: 1),
  only screen and (min-device-pixel-ratio: 1) {
}

/* 设备像素比为 1.5 */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
}

/* 设备像素比为 2 */
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2) {
}
```

**常用设备设置**

iPhones：

```css
/* ----------- iPhone 4 and 4S ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- iPhone 5 and 5S ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- iPhone 6 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- iPhone 6+ ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
}

/* Portrait */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
}
```

Galaxy Phones：

```css
/* ----------- Galaxy S3 ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 2) {
}

/* Portrait */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- Galaxy S4 ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
}

/* Portrait */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {
}

/* ----------- Galaxy S5 ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
}

/* Portrait */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {
}
```

HTC Phones：

```css
/* ----------- HTC One ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
}

/* Portrait */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {
}
```

iPads：

```css
/* ----------- iPad mini ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
}

/* ----------- iPad 1 and 2 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
}

/* ----------- iPad 3 and 4 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
}
```

### 移动端常用私有属性

目前两大主流移动平台为 iOS 和 Android，有不少带 `-webkit-` 前辍的 CSS 私有属性以及一些 iOS only 属性，当中好些属性在日常需求中经常应用到。

WebKit CSS 属性中的一部分已经被包含在 CSS 规范草案中，并且可能成为最后的推荐标准，但目前仍然是试验性的属性，还有一些属性是不规范的属性，它们没有出现在跟踪规范中。

#### -webkit-scrollbar

`-webkit-scrollbar` 是 `-webkit-` 私有的伪元素，用于对拥有 `overflow` 属性的区域自定义滚动条的样式。

例如，隐藏滚动条：

```css
.scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}
```

## TypeScript

**必须**使用 [ESLint](https://eslint.org/) 作为代码质量的检查工具。**必须**使用 [Prettier](https://prettier.io/) 作为代码风格的检查工具。

示例配置如下：

::: code-group

```js [.eslintrc.js]
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
```

```json
{
  "singleQuote": true,
  "semi": false
}
```

:::

### 命名规范

- 变量和函数命名**应该**尽量表明意图
- 变量**应该**尽量使用名词结尾
- 函数**应该**尽量使用动词开头
- 变量和函数命名**必须**使用 camelCase，如：`highLevel, getMoney()`
- 类名**必须**使用 PascalCase，如：`class Person {}`
- 环境变量和共享的常量必须使用 全字母大写 + snake_case，如：`MAX_SIZE`

### 函数

#### 泛型函数

参考 [编写好的泛型函数指南](https://www.typescriptlang.org/docs/handbook/2/functions.html#guidelines-for-writing-good-generic-functions)

#### 函数重载

参考 [编写好的函数重载](https://www.typescriptlang.org/docs/handbook/2/functions.html#writing-good-overloads)

### 类

- 如果类的创建需要参数，请**尽量**使用 [参数属性](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)

### 模块

- 所有导入**必须**放置在文件开头
- 导入**必须**以下面几个区域顺序放置，以一个空行分隔：

```ts
// 第三方库
import something from 'thirdty-part'

// 自己编码的通用函数
import helper from '../helper'

// 自己编码的组件
import cpn from 'component'

// 静态资源
import 'assets'
```

- 所有的导出在变量和函数定义时同时给出，这样能够直观看出那些数据是暴露出去的，那些是模块内部使用的，而不是仅使用一个 `export` 语句，如：

```ts
// Good
export let one
export let two
export let three
export let four

// Bad
let one
let two
let three
let four

export { one, two, three, four }
```

## Python

请参考 [PEP8](https://peps.python.org/pep-0008/)

## C++

请参考 [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html#C++_Version)
