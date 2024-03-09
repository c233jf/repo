// #region every
const item1 = document.getElementById('go')
const item2 = document.getElementById('do')
const item3 = document.getElementById('hi')

item1.addEventListener('click', () => {
  console.log('go')
})

item2.addEventListener('click', () => {
  console.log('do')
})

item3.addEventListener('click', () => {
  console.log('hi')
})
// #endregion every

// #region one
const list = document.getElementById('links')

list.addEventListener('click', (event) => {
  switch (event.target.id) {
    case 'go':
      console.log('go')
      break
    case 'do':
      console.log('do')
      break
    case 'hi':
      console.log('hi')
      break
  }
})
// #endregion one
