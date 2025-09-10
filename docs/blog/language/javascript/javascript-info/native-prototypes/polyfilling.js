import { consola } from 'consola'

// 通常来说，修改原生原型被认为是一个很不好的想法。
// 在现代编程中，只有一种情况下允许修改原生原型。那就是 polyfilling。
// Polyfilling 是一个术语，表示某个方法在 JavaScript 规范中已存在，
// 但是特定的 JavaScript 引擎尚不支持该方法，那么我们可以通过手动实现它，并用以填充内建原型。

if (!String.prototype.repeat) {
  // 如果这儿没有这个方法
  // 那就在 prototype 中添加它

  String.prototype.repeat = function (n) {
    // 重复传入的字符串 n 次

    // 实际上，实现代码比这个要复杂一些（完整的方法可以在规范中找到）
    // 但即使是不够完美的 polyfill 也常常被认为是足够好的
    return new Array(n + 1).join(this)
  }
}

consola.info('Hello'.repeat(2)) // HelloHello
