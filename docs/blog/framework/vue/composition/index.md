---
next: false
---

# Composition API

Composition API = Reactivity API + Lifecycle hooks。

## Setup

setup 是 composition api 新增加的一个选项。

### 为什么需要 Setup

为了 composition api 能够用于以前的 options api 之上而附加的。

setup 会在所有选项之前执行。

> 推荐使用 [script setup](https://cn.vuejs.org/api/sfc-script-setup.html#basic-syntax) 替代选项中的 setup。

## 为什么需要 Composition API

为了更好的代码组织和逻辑复用。

你可以把 composition api 的任意部分提取到外部函数中，因为它们本质上只是函数调用。

在以前的 options api 中，如果一个组件有三个 feature 如：feature A，feature B，feature C。我们可能会遇到以下代码：

```ts
export default {
  data() {
    return {
      foo: 1, // feature A
      bar: 2, // feature B
      baz: 3, // feature C
    }
  },

  methods: {
    one() {}, // feature A
    two() {}, // feature B
    three() {}, // feature C
  },
}
```

如果以选项的角度来说，这很容易理解，但是当我们以逻辑或功能特性的角度去看，比如我们只关心 feature A，由于逻辑被放置在不同的选项中，我们不得不反复的上下滚动以查看相关代码，这是 options api 的一个问题 —— 把逻辑的关注点分离了，而且 options api 在逻辑复用上很麻烦，特别是组件变得越来越大的时候，这问题变得更加突出，虽然也有一些办法减轻这个问题，比如：

- 组件化，把逻辑上相关联的数据放置在同一个子组件中。但组件需要提供模板，通常用于 UI 的重用，不适用于纯逻辑的复用，并且增加了组件实例化的开销
- 使用 mixin 复用选项。但在使用多个 mixin 的情况下存在命名冲突，并且 state 的注入来源不明

> React 中的高阶组件用于解决类似的问题。具体是使用一个封装函数，该函数接受组件作为参数，返回 mixin 的 options，在 render 中渲染传入的组件并把需要的 state 作为 props 传入组件。但这并没有解决根本问题，所以又出现了一种新的模式叫 render props。在 Vue 中类似的是作用域插槽，通过提供一个默认的作用域插槽替代之前的组件渲染，缺点是需要创建更多的组件实例，这增加了性能开销。

所以为了解决以上问题，composition api 出现了。

## 优势

- 整个生命周期的状态逻辑都放在同一个函数里，相关联的代码集中一起，不再分离关注点
- 更多的函数，更少的生命周期钩子
- 无需实例化组件，减少开销
- 更容易扩展，更加灵活 —— 组合优于继承
- 函数本身就可重用，这使得封装和重用逻辑非常容易
- 函数环境充当了命名空间，无需担心命名冲突
- 直观清晰的注入来源
- 更容易的类型推导
- 更容易利用 tree-shaking 技术减少打包体积

## 示例

由于实践中更常用 script setup，所以我们的例子使用 script setup。

```vue
<script setup lang="ts">
import { useFeatureB } from 'composables/useFeatureB'

// feature A
const foo = ref(1)
const plusone = computed(() => foo.value + 1)
function incrementFoo() {}
watchEffect(() => {})

// feature B
// useFeatureB 里的代码就像上面写的一样
const { bar } = useFeatureB()

// feature C
// ...
</script>
```
