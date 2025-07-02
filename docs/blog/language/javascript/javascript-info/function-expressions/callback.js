import { consola } from 'consola'

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no()
}

function showOk() {
  consola.log('You agreed.')
}

function showCancel() {
  consola.log('You canceled the execution.')
}

// 用法：函数 showOk 和 showCancel 被作为参数传入到 ask
// showOk 和 showCancel 被称为回调函数或简称回调
ask('Do you agree?', showOk, showCancel)

// 我们可以使用函数表达式来编写一个等价的、更简洁的函数
ask(
  'Do you agree?',
  function () {
    consola.log('You agreed.')
  },
  function () {
    consola.log('You canceled the execution.')
  },
)
