export function mount(vnode, container) {
  // const el = document.createElement(vnode.tag) // [!code --]
  const el = (vnode.el = document.createElement(vnode.tag)) // [!code ++]
  // props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      el.setAttribute(key, value)
    }
  }
  // children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((e) => {
        mount(e, el)
      })
    }
  }
  container.appendChild(el)
}
