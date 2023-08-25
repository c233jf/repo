# 渲染模块

在我们开始学习如何编写 Vue 渲染模块代码之前，我们需要先熟悉一个概念 —— Virtual DOM。

## Virtual DOM

Virtual DOM（为了方便，后续简写为 VDOM）是指使用 JS 对象去表示真实的 DOM 对象结构和层级关系。VDOM 中的节点称作 VNode。

### 优势

- 与环境无关 —— 由于使用的是 JS 对象而不是真实的 DOM 对象，所以可以在浏览器之外的环境使用。例如 SSR、canvas/WebGL 以及原生移动端渲染
- 性能更好 —— 通过对 JS 对象进行操作而不是对真实的 DOM 对象进行操作，可以有效减少 DOM API 的调用，减少浏览器重绘、重排的次数

我们的渲染模块就是对 VDOM 进行处理。接下来，我们开始编写代码。

## h

首先我们实现 Vue 中用于创建 VNode 的 `h` 函数。

```js
function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  }
}
```

可以看到该函数很简单，只是把参数放进对象中然后返回。

## mount

接下来我们实现 `mount` 函数，该函数用于将 VDOM 挂载到真实的 DOM 节点上。

首先我们要做的是根据 VNode 的类型创建真实的元素，然后设置元素的 attrs，最后把元素插入到容器中。

<<< ./mount/mount1.js

## patch

最后，我们需要实现更新 DOM 的函数 `patch`。

`patch` 函数接受两个参数，分别为旧节点和新节点，然后对这两个节点进行比较，只需更新需要更新的部分。

在实现 `patch` 之前，我们需要修改一下 `mount` 函数，让它在创建元素时把元素存储到 VNode 本身，这样我们就可以在 `patch` 中访问到旧节点的真实 DOM 树。

<<< ./mount/mount2.js
<<< ./patch/patch1.js

## 完整的代码示例

::: code-group
<<< ./example.html
<<< ./main.ts
<<< ./renderer.ts
:::
