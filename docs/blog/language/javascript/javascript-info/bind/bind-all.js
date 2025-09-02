// 如果一个对象有很多方法，并且我们都打算将它们都传递出去，那么我们可以在一个循环中完成所有方法的绑定：
export function bindAll(context, ...methods) {
  methods.forEach((method) => {
    context[method] = context[method].bind(context)
  })
}
// lodash 库提供类似的函数 _.bindAll(object, methodNames)。
