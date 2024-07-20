# 面试

## 面试过程

视乎每家公司的流程，一般有 3 面，一面是技术面，二面是主管、领导之类的，三面是 HR。

1. 介绍自己

## 面试题

### v-model，即数据双向绑定原理是什么

[v-model 原理](framework/vue/principle/directives/v-model/)

### 为什么要使用 Virtual DOM 替代真实 DOM

[Renderer](framework/vue/renderer/)

### vue 的 diff 算法

[Diff 算法](framework/vue/diff.md)

### 响应式更新原理

- [Reactivity](framework/vue/reactivity/)
- [深入响应式系统](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)

### 为什么 Vue3 使用 Proxy 替代访问器描述符（getter / setter）

[不能自动对添加的属性进行依赖追踪](framework/vue/reactivity/#实现-reactive)

### Vue3 与 Vue2 有什么区别

[博客](framework/vue/difference.md)

### 描述一下父子组件通信的方式

- props / emit；
- provide / inject；
- 全局状态管理器；
- event bus（事件总线）。

### 设计一个通用的可拖拽调整列宽的 table

使用 CSS 属性 `resize: horizontal;`

### 简单描述一下使用打包工具做了什么优化

- [代码分块（Chunking）](builder/vite/chunking.md)
- [摇树（Tree Shaking）](builder/vite/tree-shaking.md)
- [最小化混淆（Minify）](builder/vite/minify.md)

### 有没有接触过 SSR，简单描述一下

### 如何优化大数据列表渲染

虚拟化列表

### 如何优化文件传输

- 文件分块

## 参考

- [七天八股速记](https://leetcode.cn/leetbook/read/7-day-interview-qian-duan/dmm5fs/)
- [语音打卡社群](https://github.com/febobo/web-interview)
