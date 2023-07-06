# 响应式模块

## 简介

响应式并不是指像 RxJS 或 Observables 这样的范例，指的是自动更新的思想。

假设我们现在有 a，b 两个变量，我想让 b 保持是 a 的 10 倍。

让我们看以下一段代码：

```ts
let a = 3
let b = a * 10
console.log(b) // 30
a = 4
console.log(b) // 30
```

观察上面代码，我们可以发现简单的赋值语句并不能让 b 自动同步为 a 的 10 倍，我们需要增加 `b = a * 10` 才能保持它们之间的同步。

在 excel 中，我们可以通过在单元格中使用函数引用另外的单元格来保持单元格之间的同步：

|     | A   | B                 |
| --- | --- | ----------------- |
| 1   | 4   | 40(fx = A1 \* 10) |

同样地，我们可以在代码中实现上述功能。

```ts
onAChanged(() => {
  b = a * 10
})
```

我们只需确保在 a 改变值时自动运行上述函数，在这里我们把这段代码变成了某种程度上的声明式或响应式。

让我们更进一步，代码不局限于变量操作，还可以执行其它副作用，如操作 DOM：

```html
<span class="cell b1"></span>
```

```ts
onStateChanged(() => {
  document.querySelector('.cell.b1').textContent = state.a * 10
})
```

上述代码还可以结合 Compiler：

```html
<span class="cell b1"> {{ state.a * 10 }} </span>
```

```ts
onStateChanged(() => {
  vnode = render(state)
})
```

现在，让我们尝试实现 `onStateChanged`

```ts
let update, state

const onStateChanged = (_update) => {
  update = _update
}

const setState = (newState) => {
  state = newState
  update()
}
```

这非常类似 React 的工作原理，通过在组件内调用 `setState` 触发状态改变和更新。而在 Vue 中，我们可以简单地使用 `state.a = 5` 触发状态改变和更新。不管 Vue 还是 React，实际上使用的都是依赖追踪系统。

## 依赖追踪

让我们回顾上述代码，`onStateChanged` 在使用的时候会追踪状态使用的任何属性，这种形式在很多依赖追踪系统中是一种基本的使用形式。

> This is the basic form of the dependency tracking systems as seen in Knockout.js, Meteor Tracker, Vue and MobX

### 优点

- 允许追踪细粒度的变化，只会在需要的部分触发更新

### 缺点

- 运行时开销，因为依赖收集会消耗部分性能

在记录状态中，我们遇到的困难是找到一个合适的跟踪依赖关系的粒度。而 Vue 在实践中发现在组件级别追踪依赖关系更有效。

## Vue3 的响应式 API

```ts
import { reactive, watchEffect } from 'vue'

// 创建响应式状态
const state = reactive({
  count: 0,
})

/**
 * 类似于 onStateChanged
 * 这个函数的命名是为了更符合 Vue2 中 watch api 的命名
 * 与 watch 的区别是, 它会监听这个函数, 然后立即运行这个函数
 * 在追踪的状态变更后会重新执行这个函数
 */
watchEffect(() => {
  console.log(state.count)
}) // 0

state.count++ // 1
```

接下来，让我们简单实现 `reactive` 和 `watchEffect`。

## 实现

我们把这次实现分为三个步骤

### 让 `watchEffect` 和依赖追踪起效

首先我们需要一个叫做 `Dep` 的类，该类负责处理依赖相关的操作。

然后我们还需要实现 `watchEffect`，`watchEffect` 接收 `effect` 作为参数，并使用一个模块变量存储该 `effect`，然后立即执行 `effect`。

在这两个基础上，我们需要实现以下效果：

```ts
const dep = new Dep()

watchEffect(() => {
  dep.depend()
  console.log('effect run')
}) // log effect run instantly

dep.notify() // log effect run
```

`Dep` 实现如下：

<<< ./dep/Dep1.ts

`watchEffect` 实现如下：

<<< ./watch.ts

### 自动进行依赖追踪

```ts
const dep = new Dep('hello')

watchEffect(() => {
  console.log(dep.value)
}) // log hello instantly

dep.value = 'changed' // log changed
```

我们需要修改一下 `Dep` 类：

<<< ./dep/Dep2.ts{6-16}

这里有个边缘案例需要注意：

```ts
const ok = new Dep(true)
const msg = new Dep('hello')

watchEffect(() => {
  if (ok.value) {
    console.log(msg.value)
  } else {
    console.log('false branch')
  }
}) // log hello instantly

msg.value = 'changed' // log changed
```

当 `ok.value` 为 `false` 时，改变 `msg.value` 值不应该触发 `watchEffect`，但在这里还是会触发。具体怎么解决这种情况请查看 Vue 源码（需要清理依赖）。

### 实现 `reactive`

在这里我们的 `Dep` 类不再需要 `getter`、`setter`。

:::code-group
<<< ./main.ts
<<< ./dep/Dep1.ts [Dep.ts]
<<< ./reactive.ts
:::
