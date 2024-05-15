# v-model

`v-model` 在 Vue 中是用于表单输入绑定和在组件上实现数据双向绑定的指令。

## 表单输入绑定

通常我们需要把表单元素的值同步到 JS 中相应的变量。这时我们可以手动进行值绑定和事件监听：

```html
<input :value="text" @input="event => text = event.target.value" />
```

但是频繁地进行这种处理会很麻烦，而 `v-model` 指令帮我们简化了这一步骤：

```html
<input v-model="text" />
```

`v-model` 会根据使用的元素自动使用对应的 DOM 属性和事件组合：

- 文本类型的 `<input>` 和 `<textarea>` 元素会绑定 `value` property 并侦听 `input` 事件；
- `<input type="checkbox">` 和 `<input type="radio">` 会绑定 `checked` property 并侦听 `change` 事件；
- `<select>` 会绑定 `value` property 并侦听 `change` 事件。

::: tip
`v-model` 会忽略任何表单元素上初始的 `value`、`checked` 或 `selected` attribute。它始终将当前绑定的 JS 变量视为数据的正确来源。你应该在该变量中进行初始化。
:::

::: tip
对于需要使用[输入法](https://en.wikipedia.org/wiki/Input_method)的语言（中文、日文和韩文等），`v-model` 不会在拼字阶段触发更新。如果你想要在拼字阶段触发更新，那就直接使用值绑定和事件监听而不要使用 `v-model`。
:::

### 修饰符

#### `.lazy`

对于输入框而言，默认情况下，`v-model` 会在每次 `input` 事件后更新数据（输入法拼字阶段除外）。你可以使用 `lazy` 修饰符来改为在每次 `change` 事件后更新数据：

```html
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

#### `.number`

如果你想让用户输入自动转换为数字，你可以使用 `number` 修饰符来管理输入：

```html
<input v-model.number="age" />
```

如果该值无法被 `parseFloat()` 处理，那么将返回原始值。

`number` 修饰符会在输入框有 `type="number"` 时自动启用。

#### `.trim`

如果你想要默认自动去除用户输入内容中两端的空白符，你可以使用 `trim` 修饰符：

```html
<input v-model.trim="msg" />
```

### 源码解析

让我们以以下代码作为例子：

```html
<input v-model="text" />
```

在经过编译器编译后的代码：

```ts
_withDirectives(
  _createElementVNode(
    'input',
    {
      'onUpdate:modelValue':
        _cache[0] || (_cache[0] = ($event) => (_ctx.text = $event)),
    },
    null,
    512 /* NEED_PATCH */
  ),
  [[_vModelText, _ctx.text]]
)
```

`createElementVNode()` 是用来生成 VNode 的，在这里我们暂时不需要理会。我们先来查看下 `vModelText` 的源码。

```ts
// We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.
export const vModelText: ModelDirective<
  HTMLInputElement | HTMLTextAreaElement
> = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode)
    const castToNumber =
      number || (vnode.props && vnode.props.type === 'number')
    addEventListener(el, lazy ? 'change' : 'input', (e) => {
      if ((e.target as any).composing) return
      let domValue: string | number = el.value
      if (trim) {
        domValue = domValue.trim()
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue)
      }
      el[assignKey](domValue)
    })
    if (trim) {
      addEventListener(el, 'change', () => {
        el.value = el.value.trim()
      })
    }
    if (!lazy) {
      addEventListener(el, 'compositionstart', onCompositionStart)
      addEventListener(el, 'compositionend', onCompositionEnd)
      // Safari < 10.2 & UIWebView doesn't fire compositionend when
      // switching focus before confirming composition choice
      // this also fixes the issue where some browsers e.g. iOS Chrome
      // fires "change" instead of "input" on autocomplete.
      addEventListener(el, 'change', onCompositionEnd)
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? '' : value
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode)
    // avoid clearing unresolved text. #2302
    if ((el as any).composing) return
    const elValue =
      (number || el.type === 'number') && !/^0\d/.test(el.value)
        ? looseToNumber(el.value)
        : el.value
    const newValue = value == null ? '' : value

    if (elValue === newValue) {
      return
    }

    if (document.activeElement === el && el.type !== 'range') {
      if (lazy) {
        return
      }
      if (trim && el.value.trim() === newValue) {
        return
      }
    }

    el.value = newValue
  },
}
```

可以看到该指令由 `created`、`mounted` 和 `beforeUpdate` 三个生命周期钩子组成。在 `created` 中，首先通过 `getModelAssigner()` 获取 vnode 上的 `onUpdate:modelValue` 事件处理程序，并赋值给 `el[assignKey]`。

这两部分源码如下：

```ts
const getModelAssigner = (vnode: VNode): AssignerFn => {
  const fn =
    vnode.props!['onUpdate:modelValue'] ||
    (__COMPAT__ && vnode.props!['onModelCompat:input'])
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn
}

const assignKey = Symbol('_assign')
```

然后通过监听输入事件，在事件处理程序中调用 `onUpdate:modelValue` 事件处理程序并传入元素的值 `el[assignKey](domValue)`，这样就能完成表单元素值的改变更新到 JS 变量中。看，实际上这个过程很简单。

而 JS 变量值与 DOM 值的同步也很简单，在 `beforeUpdate` 中，首先获取最新的 `onUpdate:modelValue` 事件处理程序，在最后把新的值赋值给元素，这样就能完成变量值与 DOM 值的同步。

至于 `mounted` 在这里的作用则是用于设置元素的初始值。

我们再来看下三个修饰符 `lazy`、`number` 和 `trim` 分别是怎么实现的。

`lazy`：

使用 `lazy` 修饰符时，元素的监听事件从 `input` 变为 `change`，并且不再监听 `compositionstart` 和 `compositionend` 事件。因为此时不需要处理输入法拼字阶段的情况。在 `beforeUpdate` 中，如果当前激活元素是自身并且元素类型不是 `range`，则什么都不做。

`number`：

当使用 `number` 修饰符时，在元素的事件处理程序中使用了 `looseToNumber()` 把元素值转换成数字。

```ts
/**
 * "123-foo" will be parsed to 123
 * This is used for the .number modifier in v-model
 */
export const looseToNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
```

但是要注意，在 `beforeUpdate` 中不会对 JS 中变量值做处理，也就是会直接把变量值赋值给元素。

`trim`：

当使用 `trim` 修饰符时，在元素的事件处理程序中会对表单输入调用 `trim()`。在 `beforeUpdate` 中，如果当前激活元素是自身并且元素类型不是 `range`，会判断元素值 `trim()` 之后的结果与新值是否相等，如果相等则什么都不做。

文档中还提到，在使用输入法的情况下，`v-model` 不会在拼字阶段时触发更新。具体原理是通过监听 `compositionstart` 和 `compositionend` 事件，在 `compositionstart` 事件中给元素设置 `composing` 属性为 `true`；在 `compositionend` 事件中判断元素 `composing` 是否为 `true`，如果为 `true`，则设置该属性为 `false`，同时手动分发 `input` 事件。

为了兼容性，在某些浏览器会使用 `change` 事件替代 `compositionend` 事件。

```ts
addEventListener(el, 'compositionstart', onCompositionStart)
addEventListener(el, 'compositionend', onCompositionEnd)
// Safari < 10.2 & UIWebView doesn't fire compositionend when
// switching focus before confirming composition choice
// this also fixes the issue where some browsers e.g. iOS Chrome
// fires "change" instead of "input" on autocomplete.
addEventListener(el, 'change', onCompositionEnd)
```

```ts
function onCompositionStart(e: Event) {
  ;(e.target as any).composing = true
}

function onCompositionEnd(e: Event) {
  const target = e.target as any
  if (target.composing) {
    target.composing = false
    target.dispatchEvent(new Event('input'))
  }
}
```

表单输入绑定所使用的指令除了 `vModelText`，还有 `vModelCheckbox`、`vModelRadio`、`vModelSelect` 等，`vModelText` 只是用于 `<input>`、`<textarea>` 元素，但是，对这些指令的源码解析与 `vModelText` 一样，读者可以自行阅读源码。

## 组件 v-model

`v-model` 可以在组件上使用以实现数据双向绑定。

```vue
<!-- Child.vue -->
<script setup lang="ts">
defineProps<{
  modelValue: any
}>()

defineEmits<{
  (e: 'update:modelValue', val: any): void
}>()
</script>
```

父组件可以用 `v-model` 绑定一个值：

```vue
<!-- Parent.vue -->
<Child v-model="countModel" />
```

从 Vue 3.4 开始，官方提供了一种简化的方式同时也是推荐的方式来实现双向绑定：

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
</template>
```

`defineModel()` 是一个宏，返回的值是一个 ref。该 ref 起到在父组件和当前变量之间的双向绑定的作用：

- 它的 `.value` 和父组件的 `v-model` 的值同步；
- 当它被子组件变更了，会触发父组件绑定的值一起更新。

`defineModel()` 的底层机制请查看[这里](https://cn.vuejs.org/guide/components/v-model.html#under-the-hood)。

### `v-model` 的参数

组件上的 v-model 也可以接受一个参数：

```vue
<MyComponent v-model:title="bookTitle" />
```

在子组件中，我们可以通过将字符串作为第一个参数传递给 `defineModel()` 来支持相应的参数：

```vue
<!-- MyComponent.vue -->
<template>
  <input v-model="title" type="text" />
</template>

<script setup>
const title = defineModel('title')
</script>
```

### 多个 `v-model` 绑定

组件支持多个 `v-model` 双向绑定：

```vue
<UserName v-model:first-name="first" v-model:last-name="last" />
```

```vue
<template>
  <input v-model="firstName" type="text" />
  <input v-model="lastName" type="text" />
</template>

<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>
```

### 修饰符

组件的 `v-model` 支持自定义的修饰符：

```vue
<MyComponent v-model.capitalize="myText" />
```

通过像这样解构 `defineModel()` 的返回值，可以在子组件中访问添加到组件 `v-model` 的修饰符：

```vue
<template>
  <input v-model="model" type="text" />
</template>

<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>
```

#### 带参数的修饰符

这里是另一个例子，展示了如何在使用多个不同参数的 `v-model` 时使用修饰符：

```vue
<template>
  <UserName
    v-model:first-name.capitalize="first"
    v-model:last-name.uppercase="last"
  />
</template>
```

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```

### 源码解析

首先我们看下以下例子编译后的代码：

```vue
<template>
  <Child v-model="count" />
</template>
```

```ts
_createVNode(
  _component_Child,
  {
    modelValue: _ctx.count,
    'onUpdate:modelValue':
      _cache[0] || (_cache[0] = ($event) => (_ctx.count = $event)),
  },
  null,
  8 /* PROPS */,
  ['modelValue']
)
```

再看下以下代码编译后的代码：

```vue
<template>
  <Child
    :modelValue="count"
    @update:modelValue="($event) => (count = $event)"
  />
</template>
```

```ts
_createVNode(
  _component_Child,
  {
    modelValue: _ctx.count,
    'onUpdate:modelValue':
      _cache[1] || (_cache[1] = ($event) => (_ctx.count = $event)),
  },
  null,
  8 /* PROPS */,
  ['modelValue']
)
```

上述两段代码编译后的代码是完全相同的，这意味着上述两段代码是等价的。实际上组件 `v-model` 是一个简化组件值绑定和事件监听的语法糖。这一点区别于表单输入绑定的自定义指令。

有了上述基础，我们来看一下带参数以及修饰符的组件 `v-model` 编译后的代码：

```vue
<template>
  <UserName
    v-model:firstName.capitalize="first"
    v-model:lastName.uppercase="last"
  />
</template>
```

```ts
_createVNode(
  _component_UserName,
  {
    firstName: _ctx.first,
    'onUpdate:firstName':
      _cache[0] || (_cache[0] = ($event) => (_ctx.first = $event)),
    firstNameModifiers: { capitalize: true },
    lastName: _ctx.last,
    'onUpdate:lastName':
      _cache[1] || (_cache[1] = ($event) => (_ctx.last = $event)),
    lastNameModifiers: { uppercase: true },
  },
  null,
  8 /* PROPS */,
  ['firstName', 'lastName']
)
```

有趣的一点是，参数如果采用 kebabCase 的写法，会导致编译后的代码有些区别：

```vue
<template>
  <UserName
    v-model:first-name.capitalize="first"
    v-model:last-name.uppercase="last"
  />
</template>
```

```ts
_createVNode(
  _component_UserName,
  {
    'first-name': _ctx.first,
    'onUpdate:firstName':
      _cache[0] || (_cache[0] = ($event) => (_ctx.first = $event)),
    'first-nameModifiers': { capitalize: true },
    'last-name': _ctx.last,
    'onUpdate:lastName':
      _cache[1] || (_cache[1] = ($event) => (_ctx.last = $event)),
    'last-nameModifiers': { uppercase: true },
  },
  null,
  8 /* PROPS */,
  ['first-name', 'last-name']
)
```

不过，虽然上面两段编译后的代码看起来有些区别，但实际上它们是等价的。

## References

- [表单输入绑定](https://cn.vuejs.org/guide/essentials/forms.html)
- [组件 v-model](https://cn.vuejs.org/guide/components/v-model.html)
- [视频](https://www.bilibili.com/video/BV1cV4y1F74A?p=17&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)
