export interface VNode {
  // el 的类型与平台无关, 但这里示例方便假定为 Element
  el: Element | null
  tag: string
  props?: Record<string, any>
  children?: (VNode | string)[] | string
}

export function h(
  tag: string,
  props?: Record<string, any>,
  children?: (VNode | string)[] | string
): VNode {
  return {
    el: null,
    tag,
    props,
    children,
  }
}

export function mountChildren(
  container: Element | string,
  children: (VNode | string)[]
) {
  const el =
    typeof container === 'string'
      ? document.querySelector(container)!
      : container

  children.forEach((e) => {
    if (typeof e === 'string') {
      el.appendChild(document.createTextNode(e))
    } else {
      mount(e, el)
    }
  })
}

export type Container = Element | string

export function mount(vnode: VNode, container: Container) {
  const el = (vnode.el = document.createElement(vnode.tag))
  const root =
    typeof container === 'string'
      ? document.querySelector(container)!
      : container
  const { props, children } = vnode

  if (props) {
    /**
     * 此处简化代码只用于示例
     * 实际还要考虑是设置对象的 props 还是元素的 attrs
     * 以及还要考虑 event listener 的处理
     */
    for (const key in props) {
      if (key.startsWith('on')) {
        // event listener
        el.addEventListener(key.slice(2).toLowerCase(), props[key])
      } else {
        // attrs
        el.setAttribute(key, props[key])
      }
    }
  }

  if (typeof children === 'string') {
    el.textContent = children
  } else {
    mountChildren(el, children || [])
  }

  root.appendChild(el)
}

export function patch(oldNode: VNode, newNode: VNode) {
  if (oldNode.tag === newNode.tag) {
    // props
    const el = (newNode.el = oldNode.el!)
    const { props: oldProps = {}, children: oldChildren } = oldNode
    const { props: newProps = {}, children: newChildren } = newNode

    /**
     * 此处简化代码只用于示例
     * 实际上 Compiler 生成的优化过的 Render Fn
     * 提供了一些 hints 以优化 props 遍历
     */
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
    if (!newChildren) {
      el.innerHTML = ''
    } else if (typeof newChildren === 'string') {
      if (
        (typeof oldChildren === 'string' && newChildren !== oldChildren) ||
        Array.isArray(oldChildren)
      ) {
        el.textContent = newChildren
      }
    } else {
      if (!oldChildren) {
        mountChildren(el, newChildren)
      } else if (typeof oldChildren === 'string') {
        el.innerHTML = ''
        mountChildren(el, newChildren)
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
          const oldValue = oldChildren[i]
          const newValue = newChildren[i]
          if (typeof newValue === 'string') {
            if (typeof oldValue === 'string' && newValue === oldValue) continue
            el.replaceChild(document.createTextNode(newValue), el.childNodes[i])
          } else {
            if (typeof oldValue === 'string') {
              el.replaceChild(newValue.el!, el.childNodes[i])
            } else {
              patch(oldValue, newValue)
            }
          }
        }
        if (newChildren.length > oldChildren.length) {
          mountChildren(el, newChildren.slice(oldChildren.length))
        } else if (newChildren.length < oldChildren.length) {
          oldChildren
            .slice(newChildren.length)
            .map((e, i) => el.childNodes[i])
            .forEach((e) => {
              el.removeChild(e)
            })
        }
      }
    }
  } else {
    // replace
  }
}
