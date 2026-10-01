import { consola } from 'consola'

import { eventMixin } from './event-mixin.js'

class Menu {
  choose(value) {
    this.trigger('select', value)
  }
}

Object.assign(Menu.prototype, eventMixin)

const menu = new Menu()

menu.on('select', (value) => {
  consola.info(value)
})

menu.choose('test')
