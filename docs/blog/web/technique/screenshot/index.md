# 探讨 Web 截图实现

## 动力

写该篇文章是源于我的一次工作中需要实现一个类似于 Google 搜图功能的 Google 扩展（在 Google 浏览器中点击右键，可以看到有一个菜单是使用 Google 搜索图片，点击它你就能看到实际效果，该扩展就是要实现类似的功能）。在我尝试了诸如 [html2canvas](https://html2canvas.hertzen.com/)、[js-web-screen-shot](https://www.npmjs.com/package/js-web-screen-shot) 等方案后，发现都不能满足我的需求，于是我决定自己动手实现一个截图库。

初步构想中，该库分为两个模块：

- UI：包含了绘制蒙层、绘制截取框、绘制工具栏以及图片编辑等功能，主要负责用户交互的实现
- Core：负责处理用户截取的图像、网页转图像、图像之间的混合以及网页转 MediaStream

## UI

由于该库需要在扩展中运行，可能会在内容脚本中使用插入到页面中，为了重用 UI 以及避免页面中的样式影响自身，我使用了 Web Component 和 Shadow DOM 的方式去构建 UI。

为了简化 Web Component 的构建，我使用了 Vue 去构建。（由于谷歌扩展的 content script 不支持 customElements，需要使用 polyfill，具体参考该[链接](https://stackoverflow.com/questions/42800035/why-cant-you-create-custom-elements-in-content-scripts)）

蒙层和截取框有以下两种实现方案：

- 使用 canvas 绘图（绝大多数截图扩展或库都是使用这种方式）
- 使用普通元素配以 CSS 动画效果（[Awesome Screenshot](https://chromewebstore.google.com/detail/awesome-screen-recorder-s/nlipoenfbbikpbjkfpfillcgkoblgpmj) 使用了此种方案）

该库采用第一种方式。第二种方式在快速移动截取框时会有卡顿或延迟，影响用户体验。

## Core

该模块最重要也是最困难的地方在于把网页转换成可以与截图的图像一同处理的数据。目前有以下两种方案：

- html2canvas
- WebRTC

### html2canvas 方案

该方案主要利用 [html2canvas](https://html2canvas.hertzen.com/) 库把整个网页绘制在 canvas 上，然后将其与用户截取的图像进行处理，最后获得截取区域的网页内容的图片。

#### 优点

- 实现简单，有现成的库使用

#### 缺点

- 无法百分百还原网页内容
  - 不一定能加载跨域图片
  - 无法读取 `<video>` 、`<audio>` 等媒体类型
  - 无法读取 `<iframe>` 的内容
  - 无法读取带有跨域内容的 `<canvas>`，因为它是 tainted 的
  - 不支持某些样式，例如 `box-shadow`、边框虚线、`zoom`
  - 绘制精度有缺失
- 对于有庞大内容的网页（有很多 DOM 节点），读取缓慢

### WebRTC 方案

该方案主要使用 [`getDisplayMedia`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getDisplayMedia) 和 [`getUserMedia`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) API。详细信息请参考 [MediaDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices) 和 [媒体流 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Capture_and_Streams_API)。

调用上述 API 后我们将会得到一个 Stream，我们需要创建一个 `HTMLVideoElement`，然后设置其 `srcObject` 为该 Stream，播放该 video 然后停止其所有轨道，然后把该视频绘制到 canvas 中。

把用户截取的图片与上述 canvas 组合起来进行处理。

#### 优点

- 精确还原网页内容
- 性能优于 html2canvas

#### 缺点

- 使用 `getDisplayMedia` 情况下会有授权弹窗，可能会影响用户体验
