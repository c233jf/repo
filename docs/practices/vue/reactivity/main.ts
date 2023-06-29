import { reactive } from './reactive'
import { watchEffect } from './watch'

const state = reactive({
  count: 0,
})

watchEffect(() => {
  console.log(state.count)
})

state.count++
