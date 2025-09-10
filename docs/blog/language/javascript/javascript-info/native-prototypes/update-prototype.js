import { consola } from 'consola'

String.prototype.show = function () {
  consola.info(this)
}

'BOOM!'.show() // BOOM!
