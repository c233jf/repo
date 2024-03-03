---
prev: false
---

# Web 优化

Web 优化是 Web 开发中重要的一环。快速的页面加载、流畅的用户交互体验能够有效地保留用户数量。

## 要优化的是什么？

我们首先需要知道我们要优化什么东西，否则就无从谈及 Web 优化。试想一下我们现在是使用某个网站服务的用户。

- 当我们在搜索引擎上搜索网站时，我们希望在靠前的搜索结果中就能找到该网站；
- 当我们打开该网站时，我们会期望该网站能够迅速地显示页面内容；
- 当页面中有视频、音频、图片等静态资源时，我们希望这些资源能够快速加载完成；
- 当页面中有动效时，我们希望它能够运行流畅；
- 当我们执行用户交互时，例如点击某个按钮，我们希望它能够迅速响应；
- 当页面需要加载数据时，我们希望它能够快速加载完成。

我们优化的最终结果就是提高用户体验。

## 网站性能的指标

上面描述的都是用户的主观感受，我们很难根据这些主观感受进行优化，因为我们难以判别我们的优化是否对网站性能的提高有效。我们还需要一种量化的指标来判断优化是否有效。

- [Largest Contentful Paint（LCP）](https://web.dev/articles/lcp?hl=zh-cn)：衡量加载性能。为了提供良好的用户体验，LCP **必须**在网页首次开始加载后的 **2.5 秒**内发生。
- [First Input Delay（FID）](https://web.dev/articles/fid?hl=zh-cn)：衡量互动。为了提供良好的用户体验，页面的 FID**禁止**超过 **100 毫秒**。
- [Cumulative Layout Shift（CLS）](https://web.dev/articles/cls?hl=zh-cn)：衡量视觉稳定性。为了提供良好的用户体验，**必须**将 CLS 保持在 **0.1** 或更低。

## 如何测量网站性能

**参考**

- [如何测量速度](https://web.dev/articles/how-to-measure-speed?hl=zh-cn)
- [Sentry](https://sentry.io/welcome/)

## 浏览器打开网页的过程

除了要理解用户的需求之外，我们还需要明白在访问网站的时候浏览器做了什么，知道原理我们才能有的放矢。

1. 输入 URL；
2. 浏览器查找域名对应的 IP 地址；
3. 浏览器与目标服务器建立 TCP 连接；
4. 浏览器发送请求；
5. 服务器处理请求；
6. 服务器返回响应；
7. 释放 TCP 连接；
8. 浏览器接受到响应后经过处理渲染页面并同时获取文档中的其它资源。

浏览器通过渲染引擎显示页面内容。渲染引擎从网络层获取到所请求 HTML 文档的内容后开始解析文档以构建 DOM 树（网络中的内容不是一次性获取完毕的）。同时在遇到外部 CSS 文件和样式元素中的样式时数据引擎会解析并生成样式规则。渲染引擎会把 DOM 树和样式信息经过一个步骤（这个步骤不同的渲染引擎命名不同）构建出渲染树。然后，对渲染树进行“布局”和“绘制”后呈现页面内容。

> 需要注意的是，这是一个渐进的过程。为了提供更好的用户体验，渲染引擎会尝试尽快在屏幕上显示内容。它不必等到所有 HTML 内容解析完毕之后，就会开始构建渲染树和设置布局。 系统会解析并显示部分内容，同时继续处理来自网络的其余内容。

渲染引擎基本流程：

```mermaid
flowchart LR
  a["解析 HTML 文档以构建 DOM 树"] --> b["构建渲染树"] --> c["布局渲染树"] --> d["绘制渲染树"]
```

不同渲染引擎主流程：

WebKit：

![WebKit 主流程](https://web.dev/static/articles/howbrowserswork/image/webkit-main-flow-b779d50c0cf28_856.png?hl=zh-cn)

Gecko：

![Gecko 主流程](https://web.dev/static/articles/howbrowserswork/image/mozillas-gecko-rendering-b18e445544965_856.jpg?hl=zh-cn)

## 优化方法

在拥有了量化指标和熟悉了原理之后，我们所需要做的就是把网站性能往良好的指标方向靠拢。

### 尽快显示内容

- 把样式表放在 HTML 文档 `<head>` 中；
- 把脚本放在 `<body>` 底部或设置脚本 `async`、`defer` 属性；

浏览器对样式表和脚本的处理顺序采用了不同的模型。

样式表采用的模型是非同步的。也就是加载和解析样式表不会导致文档解析停止，但是一个延迟加载的样式表有可能会导致浏览器以默认样式显示网页内容，这种情况被称为 [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)。而且存在一个问题，那就是如果脚本在文档解析阶段请求样式信息，这时如果样式尚未加载和解析，会导致脚本获得错误信息，这显然会导致很多问题，因此，许多浏览对此做了处理，例如：如果存在仍在加载和解析的样式表，Firefox 会阻止所有脚本。而 WebKit 只有当脚本尝试访问可能会受未加载的样式表影响的特定样式属性时，才会阻止脚本。所以，尽早地加载样式表能够有助于避免 FOUC 以及避免阻塞脚本执行。

脚本采用的模型是同步的。浏览器在遇到 `<script>` 标签时，会立即解析并执行。文档解析会被停止，直到脚本执行完毕。如果脚本是外部的，则必须先从网络中提取资源 —— 此操作也是同步完成的，解析会停止，直到提取资源为止。虽然浏览器对此进行了优化 —— 推测解析。在执行脚本时，另一个线程会解析文档的其余部分，找出并加载需要从网络加载的其他资源。通过这种方式，可以在并行连接上加载资源，从而提高整体速度。但是，推测性解析器仅解析对外部资源（如外部脚本、样式表和图片）的引用，它不会修改 DOM 树。不过我们可以使用 `<script>` 标签的 `async`、`defer` 属性来延缓脚本的执行，避免其阻塞页面渲染。

- async：应立即下载脚本，但不应妨碍页面中的其它操作，例如下载其它资源。使用了该属性的脚本可以由其它线程解析和执行。
- defer：脚本可以延迟到文档被完全解析和显示之后再执行。

以上两个属性都只对外部脚本有效。

- 使用预加载，即 `prefetch` 属性，但兼容性一般。

### 减少页面重布局

所有影响到元素尺寸或定位的操作都有可能触发浏览器对页面进行重新布局。布局相对于渲染的其它阶段而言是一个耗时的过程，当我们进行页面操作的时候应尽可能避免或减少重布局的发生。

示例：

```js
// Bad!
const parent = document.querySelector('#div1')
for (let i = 1; i < 10; i++) {
  const child = document.createElement('div')
  parent.appendChild(child)
}

// Good!
const childs = []
for (let i = 1; i < 10; i++) {
  const child = document.createElement('div')
  childs.push(child)
}
parent.append(...childs)
```

另一种方法是使用[函数节流](../api/timer/index.md#函数节流)。

### 禁止执行长时间的 JS

浏览器在执行 JS 的时候会阻塞渲染进程的执行，执行耗时的 JS 有可能会造成页面卡顿甚至出现页面无响应警告。

通常耗时的操作出现在以下情况下：

- 处理大量的数据；
- 大量的嵌套循环或嵌套函数调用；
- 不断触发的事件或定时器；
- 计算量大的操作，如：压缩、加密等。

对此的解决方法：

- 使用[数据分块](../api/timer/index.md#数据分块)、[Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)；
- 展开循环，降低循环次数与减少嵌套层级；
- 加大触发的时间间隔或进行[函数节流](../api/timer/index.md#函数节流)；
- 使用 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)。

### 减少请求次数

- 使用 `svg` 图标；
- 使用 CSS Sprites；
- 合理地合并多个脚本文件和 CSS 文件；
- 使用懒加载技术。

### 减小资源体积大小

- 对图片、视频等资源进行压缩；
- 对 HTML、脚本、CSS 文件等启用服务器压缩；
- 将大型脚本分割成多个小型的脚本；
- 使用按需加载技术；
- 项目构建时使用 minimize。

### 缩短资源传输时间

- 使用 CDN；

**参考**

- [什么是 CDN？](https://aws.amazon.com/cn/what-is/cdn/)
- [内容分发网络](https://zh.wikipedia.org/zh-cn/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF)
- [什么是内容交付网络](https://www.akamai.com/zh/glossary/what-is-a-cdn)

- 使用缓存（客户端缓存、CDN 缓存、服务器缓存等）。

**参考**

- [HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

### 流畅的动画

- 尽可能使用 CSS3 动画替代 JS 动画，因为 CSS3 动画有内部优化；
- 如果使用 JS 动画的话，请使用 `requestAnimationFrame()` 替换 `setTimeout()`；
- 使用不会触发重排和重绘的 CSS 属性。例如，使用 `transform` 而不是 `width`、`height`；
- 使用 `transition` 做流畅的过渡效果，或者把 `keyframes` 分割得尽可能少。

## References

- [欢迎学习“性能”课程](https://web.dev/learn/performance/welcome?hl=zh-cn)
- [Web Vitals](https://web.dev/articles/vitals?hl=zh-cn)
- [浏览器的工作方式](https://web.dev/articles/howbrowserswork?hl=zh-cn)
- [深入了解现代网络浏览器](https://developer.chrome.com/blog/inside-browser-part1?hl=zh-cn)
- [阻塞渲染的 CSS](https://web.dev/articles/critical-rendering-path/render-blocking-css?hl=zh-cn)
- [ 一次访问网页请求的全过程详解](https://blog.csdn.net/jiao_0509/article/details/82491299)
- [TGideas 页面性能优化指引](https://tgideas.qq.com/doc/frontend/explore/performance.html)
- [Web 前端性能优化 —— 如何提高页面加载速度](https://www.cnblogs.com/MarcoHan/p/5295398.html)
