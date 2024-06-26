# Vue 3 与 Vue 2 的区别

## 源码组织

使用 monorepo 管理源码。Vue 2 的代码主要放置在 `src` 目录下，而 Vue 3 的代码则按模块拆分成各个 package 放置在 `packages` 目录下。

虽然后续 Vue 2 也采用了 monorepo 管理代码，但是只把 `compiler-sfc`、`server-renderer` 以及 `template-compiler` 这 3 个包划分到 `packages` 下，其它代码仍然放置在 `src` 中。

这种代码组织方式的好处：

- 模块拆分更细化，职责划分明确
- 模块之间的依赖关系更加清晰
- 更容易阅读、理解和更改源码
- 提高代码可维护性
- 每个 package 可独立于框架使用，用户可单独使用某个 package，而不需要依赖整个框架，减少了引用包的体积。例如：用户可以单独安装 Vue 3 的 reactivity 库，而 Vue 2 则不行

## 引入 RFC：使每个版本改动可控

在 Vue 2 开发的后期阶段引入了 RFC（Request For Comments）机制，为新功能进入框架提供一个一致且受控的路径。

在开发 Vue 3 时，则大规模启用 RFC。通过 RFC，你可以了解一个 feature 被采用或废弃的前因后果。

## 性能优化

### 源码体积

- 移除一些冷门 feature
- 引入 tree-shaking 技术

源码体积越少，网络传输的时间就越短。

tree-shaking 依赖于 ES2015 模块语法的静态导入、导出（`import` 和 `export`）。许多支持 tree-shaking 技术的打包工具会在编译阶段进行静态分析，给没有使用的代码打上标记，然后在压缩阶段移除这些代码。最终这些被标记的代码不会被打包到构建产物中。

例如，如果你在项目中没有使用 `<Transition>`、`<KeepAlive>` 等组件，那么它们对应的代码就不会被打包。这样就间接减少了项目引入的 Vue 包体积。

### 数据劫持优化

Vue 2 是通过 `Object.defineProperty` 劫持数据的 `getter` 和 `setter`。但这种方式有以下缺点：

- [不能自动对添加和删除的属性进行依赖追踪](reactivity/#实现-reactive)，虽然提供了 `$set()` 方法，但对于用户来说还是增加了一点心智负担
- 对于嵌套层级较深的对象，Vue 需要递归调用 `Object.defineProperty` 把每层对象都变成响应式，如果我们定义的数据过于复杂，就会造成相当大的性能负担

Vue 3 使用 `Proxy` 完成数据劫持。`Proxy` 能够捕获属性的添加和删除并进行相应处理。需要注意的是，`Proxy` API 并不能监听到深层对象变化，所以 Vue 3 仍然需要在 `getter` 中去递归响应式。与 Vue 2 的区别是，Vue 3 只有在 `getter` 中访问到内部对象时才会给该对象转换成响应式，而不是无脑递归转换，这在很大程度上提升了性能。

### 编译优化

Vue 3 通过在编译阶段优化编译结果，实现在运行时 `patch` 阶段的优化。

我们知道，Vue.js 的依赖追踪系统的粒度是组件级的，这样能保证数据更新导致的重新渲染局限在组件内部。但是在 Vue 2 中，在单个组件内部仍然需要遍历整个 VNode 树，这就导致 VNode 更新的性能与模板整体大小正相关，在遍历许多静态节点时会造成性能浪费。而在 Vue 3 中，通过在编译阶段对静态模板的分析，生成了 Block tree 的结构。

Block tree 是一个将模板基于**动态节点**指令切割的嵌套区块，每个区块内部的节点结构是**固定**的，每个区块只需要一个数组来追踪自身包含的动态节点。借助该结构，Vue.js 将 VNode 更新性能由与模板整体大小正相关提升为**与动态内容的数量正相关**。

除此之外，Vue 3 在编译阶段还包含了对 Slot 的编译优化、事件处理程序的缓存优化、提升静态内容，并且在运行时重写了 diff 算法。

## 语法 API 优化

### Composition API

在 Vue 2 中，编写组件本质就是在编写一个“包含了描述组件选项的对象”。我们把这种方式称为 Options API。好处在于写法符合直觉，新手容易理解和上手。在组件小的时候，这种方式一目了然；但是在大型组件中，一个组件可能有多个逻辑关注点，每个逻辑关注点都被分散在不同的选项中，如果要修改一个逻辑关注点，就需要在文件中不断上下切换和寻找，这导致了逻辑关注点的分离。

而在 Vue 3 中，提供了 Composition API。通过把属于同一个逻辑关注点的代码都放置在同一个函数中，避免了逻辑关注点的分离。

详细信息参考[博客](composition/)。

### 其它

其它 API 的变化请参考[文档](https://v3-migration.vuejs.org/zh/)。

## References

- [视频](https://www.bilibili.com/video/BV1cV4y1F74A/?p=2&spm_id_from=pageDriver&vd_source=4f7b160f9f2a17e79bd4ab2785a8d769)