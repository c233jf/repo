<template>
  <div class="inline-block hover--black px-1 mr-2">
    <EpFullScreen
      v-if="!isFullScreen"
      class="cursor-pointer"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'

const isFullScreen = ref(false)

const handleClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning({ message: 'you browser can not work' })
    return
  }
  screenfull.toggle()
}

const handler = () => {
  isFullScreen.value = screenfull.isFullscreen
}

screenfull.on('change', handler)

onUnmounted(() => {
  screenfull.off('change', handler)
})
</script>
