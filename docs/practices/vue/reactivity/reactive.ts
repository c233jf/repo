import { Dep } from './dep/Dep1'

/**
 * Vue2 实现
 * 缺点不能自动对添加的属性进行依赖追踪
 */
// export function reactive<T extends Record<string, any>>(obj: T) {
//   Object.keys(obj).forEach((e) => {
//     const dep = new Dep()
//     let value = obj[e]

//     Object.defineProperty(obj, e, {
//       get() {
//         dep.depend()
//         return value
//       },
//       set(v) {
//         value = v
//         dep.notify()
//       },
//     })
//   })
//   return obj
// }

/**
 * 使用 WeakMap 理由
 * 1. 我们需要通过对象作为 key 去获取该对象的 map
 * 2. WeakMap 的 key 是弱引用, 这意味着在没有其他引用存在时垃圾回收能正确进行
 * 即作为 key 的对象和 value 能被垃圾回收
 */
const targetMap = new WeakMap<Record<string, any>, Map<string, Dep>>()

function getDep(target: Record<string, any>, p: string) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map<string, Dep>()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(p)
  if (!dep) {
    dep = new Dep()
    depsMap.set(p, dep)
  }
  return dep
}

/**
 * 对于数组而言, 直接通过 arr[index] 也能触发以下过程
 * 当您调用 push 时, 内部 push 将设置一个 index 并且
 * 增加 array.length, 所以 push 会隐式触发以下过程
 *
 * 为什么要使用 Reflect，请查阅此链接，https://zh.javascript.info/proxy#dai-li-yi-ge-getter
 */
const reactiveHandler: ProxyHandler<Record<string, any>> = {
  get(target, p: string, receiver) {
    const dep = getDep(target, p)
    dep.depend()
    return Reflect.get(target, p, receiver)
  },
  set(target, p: string, newValue, receiver) {
    const dep = getDep(target, p)
    const result = Reflect.set(target, p, newValue, receiver)
    dep.notify()
    return result
  },
}

export function reactive<T extends Record<string, any>>(raw: T) {
  return new Proxy<T>(raw, reactiveHandler)
}
