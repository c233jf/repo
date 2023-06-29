import { h, mount, patch } from './renderer'

const vdom = h('div', { class: 'green' }, [
  h('span', undefined, ['Hello ']),
  'Vue',
])

mount(vdom, document.getElementById('app')!)

const vdom2 = h('div', { class: 'red' }, [
  h('span', undefined, ['Hello ']),
  'Vue2222',
])

setTimeout(() => {
  patch(vdom, vdom2)
}, 1000)
