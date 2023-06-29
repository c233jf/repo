import { reactive } from '../reactivity/reactive'
import { Container, VNode, h, mount, patch } from '../renderer/renderer'
import { watchEffect } from '../reactivity/watch'

const App = {
  data: reactive({
    count: 0,
  }),
  render() {
    return h(
      'div',
      {
        onClick: () => {
          this.data.count++
        },
      },
      String(this.data.count)
    )
  },
}

function mountApp(component: typeof App, container: Container) {
  let isMounted = false
  let oldVNode: VNode

  watchEffect(() => {
    const newVNode = component.render()
    if (!isMounted) {
      mount(newVNode, container)
      isMounted = true
    } else {
      patch(oldVNode, newVNode)
    }
    oldVNode = newVNode
  })
}

mountApp(App, '#app')
