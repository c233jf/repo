<script setup lang="ts">
  import VirtualList from './components/VirtualList.vue'
  import VirtualList2 from './components/VirtualList2.vue'
</script>

# 虚拟化列表

## 背景

使用列表或表格进行数据展示在前端中是很常见的事情，特别是在各种中后台管理系统和数据分析中更是常见。有时候，我们会遇到需要渲染大量数据的情况，但是表格在渲染大量数据的情况下很容易出现卡顿，通常我们可以使用分页、过滤的方式解决，但在某些业务中我们无法使用这些方法，例如，交易系统、教务系统等，在这些业务中的列表或表格一般是不能分页的。为了优化在列表中进行大量数据的渲染，我们需要使用一种被称为虚拟化列表的技术。

## 介绍

**虚拟化列表**：根据元素的滚动情况，仅在滚动容器元素的可视区域渲染一部分数据，以避免在渲染大量数据的情况下出现的卡顿。

## 实现

[原理](https://github.com/dwqs/blog/issues/70#)

### 列表项固定高度

<VirtualList :height="500" />

<<< ./components/VirtualList.vue

### 列表项动态高度

<VirtualList2 :height="500" :estimated-item-height="50" />

## 缺点

虽然虚拟化表格解决了超大数据渲染的性能问题，但它并不是完美无瑕的。该方案有以下两个缺点：

- 网络响应的负载增加
- 为了保存大量数据，使用的内存容量增加

> 即使虚拟化的表格是高效的，但是当数据负载过大时，**网络**和**内存容量**也会成为您应用程序的瓶颈。 因此请牢记，虚拟化表格永远不是最完美的解决方案，请考虑数据分页、过滤器等优化方案。

## 其它工具和库

- [探索 Table 组件虚拟化](https://juejin.cn/post/6942301191191658527)
- [ElementPlus 虚拟化表格组件](https://element-plus.org/zh-CN/component/table-v2.html)
- [useVirtualList](https://vueuse.org/core/useVirtualList/)
