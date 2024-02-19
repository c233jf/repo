# 静态资源

## 图片

### GIF

> GIF 图象是基于颜色列表的（存储的数据是该点的颜色对应于颜色列表的索引值），最多只支持 8 位（256 色）。GIF 文件内部分成许多存储块，用来存储多幅图象或者是决定图象表现行为的控制块，用以实现动画和交互式应用。GIF 文件还通过 LZW 压缩算法压缩图象数据来减少图象尺寸。

特性：

- 可插入多帧，从而实现动画效果；
- 可设置透明色以产生对象浮现于背景之上的效果；
- 由于采用了 8 位压缩，最多只能处理 256 种颜色，故不宜应用于真彩色图片。

参考：

- [GIF](https://zh.wikipedia.org/wiki/GIF)
- [文档](http://dev.gameres.com/Program/Visual/Other/GIFDoc.htm)

### PNG

> PNG 是 20 世纪 90 年代中期开始开发的图像文件存储格式，其目的是企图替代 GIF 和 TIFF 文件格式，同时增加一些 GIF 文件格式所不具备的特性。流式网络图形格式（Portable Network Graphic Format，PNG）名称来源于非官方的“PNG’s Not GIF”，是一种位图文件（bitmap file）存储格式，读成“ping”。PNG 用来存储灰度图像时，灰度图像的深度可多到 16 位，存储彩色图像时，彩色图像的深度可多到 48 位，并且还可存储多到 16 位的 α 通道数据。PNG 使用从 LZ77 派生的无损数据压缩算法。

特性：

- 支持 256 色调色板技术，文件体积小；
- 无损压缩；
- 最高支持 48 位真彩色图像以及 16 位灰度图像；
- 支持 Alpha 通道的透明 / 半透明特性；
- 支持图像亮度的 Gamma 校准信息；
- 支持存储附加文本信息，以保留图像名称、作者、版权、创作时间、注释等信息；
- 渐近显示和流式读写，适合在网络传输中快速显示预览效果后再展示全貌；
- 使用 CRC 防止文件出错；
- 最新的 PNG 标准允许在一个文件内存储多幅图像。

参考：

- [PNG 官方站 - PNG General Information](http://www.libpng.org/pub/png/)
- [PNG 格式](http://dev.gameres.com/Program/Visual/Other/PNGFormat.htm)
- [PNG](https://zh.wikipedia.org/wiki/PNG)

### JPEG

> JPEG 是一种针对照片视频而广泛使用的一种有损压缩标准方法。这个名称代表 Joint Photographic Experts Group（联合图像专家小组）。此团队创立于公元 1986 年，1992 年发布了 JPEG 的标准而在 1994 年获得了 ISO 10918-1 的认定。

特性：

- 适用于储存 24 位元全采影像；
- 采取的压缩方式通常为有损压缩；
- 不支持透明或动画；
- 压缩比越高影像耗损越大，失真越严重；
- 压缩比在 10 左右肉眼无法辨出压缩图与原图的差别。

参考：

- [JPEG](https://zh.wikipedia.org/wiki/JPEG)

### WebP

> WebP，是一种同时提供了有损压缩与无损压缩的图片文件格式，派生自视频编码格式 VP8，是由 Google 在购买 On2 Technologies 后发展出来。WebP 最初在 2010 年发布，2011 年 11 月 8 日，Google 开始让 WebP 支持无损压缩和透明色的功能，而在 2012 年 8 月 16 日的参考实做 libwebp 0.2.0 中正式支持

特性：

- 同时提供有损压缩和无损压缩两种图片文件格式；
- 文件体积小，无损压缩后，比 PNG 文件少了 45％ 的文件大小；有损压缩后，比 JPEG 文件少了 25% - 34% 文件大小；
- 浏览器兼容性一般，[WebP 兼容性](https://developers.google.com/speed/webp/faq#which_web_browsers_natively_support_webp)。

参考：

- [Webp](https://zh.wikipedia.org/wiki/WebP)
- [WEBP 探寻之路](http://isux.tencent.com/introduction-of-webp.html)

### 内容图

内容图多以商品图等照片类图片形式存在，颜色较为丰富，文件体积较大。

- 条件允许的话优先考虑 WebP 格式，其次考虑 JPEG 格式；

### 背景图

背景图多为颜色比较简单、文件体积不大、起修饰作用的图片。

- 条件允许的话优先考虑 WebP 格式，否则按照以下两种；
- 图像颜色丰富而且文件不太大的（40KB 以下）或有半透明效果的优先考虑 PNG24 格式；
- 图像颜色丰富而且文件比较大的（40KB - 200KB）优先考虑 JPEG 格式；

### 图片大小

- PC 平台单张的图片的大小不应大于 200KB；
- 移动平台单张的图片的大小不应大于 100KB。

### 图片质量

- 上线的图片都应该经过压缩处理，压缩后的图片不应该出现肉眼可感知的失真区域；
- 60 质量的 JPEG 格式图片与质量大于 60 的相比，肉眼已看不出明显的区别，因此保存 JPEG 图的时候，质量一般控制在 60，若保真度要求高的图片可适量提高到 80，图片大小控制在 200KB 以内。

### 图片引入

**CSS Sprites**

特点：

- 减少请求数；
- 加速图片的显示；
- 维护更新成本大；
- 更多的内存消耗，特别是大体积或有过多空白的 Sprites 图；
- 图片渗漏，相邻的不需展示的图片有可能出现在展示元素中，特别是在高清设备移动设备上。

使用建议：

- 适合使用频率高更新频率低的小图标；
- 尽量不留太多的空白；
- 体积较大的图片不合并；
- 确保要合并的小图坐标数值和合并后的 Sprites 图尺寸均为偶数。

**Data URIs（base64 编码）**

特点：

- 减少请求数；
- 转换文件体积大，大约比原始的二进制大 33%；
- IE6 / IE7 不支持（一般不需要管）；
- 图片显示相对较慢，需要更多的 CPU 消耗。

使用建议：

- 适合更新频率高的小图片，如某些具备自定义功能的标题 icon 等；
- 转换成 Base64 编码的图片应小于 2KB；
- 移动端不使用 Base64 编码；
- 要兼容 IE6 / IE7 的不使用。

参考：

- [《When to Base64 Encode Images (and When Not To)》](http://davidbcalhoun.com/2011/when-to-base64-encode-images-and-when-not-to/)
- [《Data URI 最佳实践》](http://madscript.com/html5/datauri-best-practice/)
- [《Data URI&MHTML: 用还是不用？》](http://www.99css.com/492/)
- [CSS Sprites vs. Data URIs: Which is Faster on Mobile?](http://www.mobify.com/blog/css-sprites-vs-data-uris-which-is-faster-on-mobile/)

## 图标

**应该**使用 `svg` 替代字体图标。

开源图标库：[iconify](https://iconify.design/)

参考：

- [聊聊纯 CSS 图标](https://antfu.me/posts/icons-in-pure-css-zh)
