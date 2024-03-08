# DOM 操作技术

## 动态脚本

**动态脚本**：在页面加载时不存在，但将来的某一时刻通过修改 DOM 动态添加的脚本。

创建动态脚本有两种方式：插入外部脚本和插入内联 JS 代码。

### 插入外部脚本

以下面这个 `<script>` 元素为例子：

```html
<script src="example.js"></script>
```

动态插入该脚本的代码如下：

<<< ./example-1.ts#external

```ts
loadScript('example.js')
```

::: info
在 `<script>` 添加到文档之后才会开始加载外部脚本文件，加载完成后会立即执行。
:::

默认情况下，动态脚本的行为是**异步**的。

- 它们不会阻塞任何东西；
- 先加载完的先执行。

但是可以通过设置 `script.async = false` 改变这个规则。设置该值后，脚本将按照在文档中的顺序执行，类似于设置 `defer`。

如果设置了 `script.async = false`，在加载一个库和一个依赖于它的脚本时，添加顺序就很重要。

### 插入内联 JS 代码

<<< ./example-1.ts#inline

```ts
loadInlineScript("function hi() { alert('hi'); }")
```

::: info
以这种方式加载的代码运行在全局作用域。实际上，这种方式与在全局作用域中使用 `eval()` 是一样的。
:::

## 动态样式

**动态样式**：在页面加载时不存在，但将来的某一时刻通过修改 DOM 动态添加的样式。

创建动态样式有两种方式：使用 `<link>` 插入外部样式和使用 `<style>` 插入内嵌样式。

### 插入外部样式

以下面这个 `<link>` 元素为例子：

```html
<link rel="stylesheet" href="example.css" />
```

动态插入该样式的代码如下：

<<< ./example-2.ts#external

```ts
loadCSS('example.css')
```

::: info
在 `<link>` 添加到文档之后才会开始加载外部样式，这个过程也是**异步**的。
:::

### 插入内嵌样式

<<< ./example-2.ts#inline

```ts
loadStyle('body{background-color:red;}')
```

::: danger
如果针对 IE 编写代码，请务必小心使用 `styleSheet.cssText` 属性。在重用同一个 `<style>` 并再次设置这个属性时，有可能会导致浏览器崩溃。同样，设置 `cssText` 为空字符串也可能导致浏览器崩溃。
:::

## References

- JavaScript 高级程序设计（第 3 版）第 10 章第 2 节
- [动态脚本](https://zh.javascript.info/script-async-defer#dong-tai-jiao-ben)
