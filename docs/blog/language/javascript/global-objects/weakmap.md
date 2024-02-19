---
next: false
---

# WeakMap

WeakMap 是一组键值对的集合，其中键是弱引用。键必须是对象，但值可以是任意的。

## Why WeakMap

> 在 JavaScript 里，`map` API 可以通过使其四个 API 方法共用两个数组(一个存放键，一个存放值)来实现。给这种 `map` 设置值时会同时将键和值添加到这两个数组的末尾。从而使得键和值的索引在两个数组中相对应。当从该 `map` 取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出相应的值。

这样实现会有两个很大的缺点：

- 赋值和搜索操作都是 $O(n)$ 的时间复杂度（$n$ 是键值对的个数），因为这两个操作都需要遍历整个数组来进行匹配
- 可能导致内存泄漏，因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理它们，即使没有其它任何引用存在

相比之下，WeakMap 的键是弱引用，这意味着没有其它引用时，垃圾回收能正常进行。

## Cons

**WeakMap 的 key 是不可枚举的**。如果 key 是可枚举的话，其集合将会受垃圾回收机制影响，从而得到不确定的结果。

## Use Case

如果你的键值对集合使用的 key 是对象的话，那么就应该使用 WeakMap。

```ts
const target = {}
const value = 1
const map = new WeakMap()
map.set(target，value)
```

## References

- [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
