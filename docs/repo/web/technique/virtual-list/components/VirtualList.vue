<template>
  <div
    ref="container"
    :style="{ height: height + 'px' }"
    class="border border-solid border-black overflow-auto rounded"
  >
    <div
      :style="{
        height: data.length * itemHeight + 'px',
        paddingTop: topPadding + 'px',
      }"
    >
      <div
        v-for="i in visibleData"
        :key="i"
        :style="{ height: itemHeight + 'px' }"
        :class="{
          'leading-50px': true,
          'text-center': true,
          'bg-gray-200': i % 2 === 0,
        }"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  height: number
}>()

// 创建 0 到 9999 的数组
// new Array(10000).fill(0).map((_, i) => i)
// Array.from(Array(10000).keys())
// Array.from({ length: 10000 }, (_, i) => i)
const data = shallowRef(Array.from({ length: 10000 }, (_, i) => i))

const itemHeight = 50
const bufferSize = 3

// 计算可视区域内的元素个数
const visibleCount = computed(() => Math.ceil(props.height / itemHeight))
const start = ref(0)
const visibleData = computed(() =>
  data.value.slice(
    Math.max(0, start.value - bufferSize),
    start.value + visibleCount.value + bufferSize,
  ),
)

const topPadding = computed(
  () => Math.max(0, start.value - bufferSize) * itemHeight,
)
const container = shallowRef<HTMLDivElement | null>(null)

let _scrollTop = 0
// 缓存锚点元素的位置信息，默认为第一个元素
const anchor = {
  top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量
  bottom: 50, // 锚点元素的底部距离第一个元素的顶部的偏移量
}

const updateAnchor = (scrollTop: number) => {
  start.value = Math.floor(scrollTop / itemHeight)
  anchor.top = start.value * itemHeight
  anchor.bottom = anchor.top + itemHeight
}

useEventListener(container, 'scroll', (e) => {
  const { scrollTop } = e.target as HTMLElement
  if (scrollTop < _scrollTop) {
    if (scrollTop < anchor.top) {
      updateAnchor(scrollTop)
    }
  } else {
    if (scrollTop > anchor.bottom) {
      updateAnchor(scrollTop)
    }
  }
  _scrollTop = scrollTop
})
</script>
