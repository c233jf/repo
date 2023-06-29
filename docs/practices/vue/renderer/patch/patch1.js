import { mount } from '../mount/mount2'

export function patch(n1, n2) {
  if (n1.tag === n2.tag) {
    const el = (n2.el = n1.el)

    // props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    for (const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if (newValue !== oldValue) {
        el.setAttribute(key, newValue)
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    // children
    const oldChildren = n1.children
    const newChildren = n2.children
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      } else {
        el.textContent = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') {
        el.innerHTML = ''
        newChildren.forEach((e) => {
          mount(e, el)
        })
      } else {
        /**
         * 对于数组的比较, Vue 中有两种模式
         * 一: 键模式
         * 给组件或元素提供一个 key, 该 key 用作节点
         * 位置的提示
         *
         * 二: 不带 key
         * 按索引位置比较, 不同就直接替换
         *
         * 下面只实现第二种, 第一种看源码
         */
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((e) => {
            mount(e, el)
          })
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((e) => {
            el.removeChild(e.el)
          })
        }
      }
    }
  } else {
    // replace
  }
}
