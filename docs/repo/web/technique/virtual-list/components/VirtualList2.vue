<template>
  <div
    ref="container"
    :style="{ height: height + 'px' }"
    class="border border-solid border-black overflow-auto rounded"
  >
    <div
      :style="{
        height: data.length * avgHeight + 'px',
        paddingTop: topPadding + 'px',
      }"
    >
      <div
        v-for="item in visibleData"
        :id="String(item.id)"
        :key="item.id"
        ref="itemRefs"
        class="pl-2 overflow-hidden"
        :class="{
          'bg-gray-200': item.id % 2 === 0,
        }"
      >
        <p>#{{ item.id }} {{ item.words }}</p>
        <p>{{ item.paragraphs }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker'

const props = defineProps<{
  height: number
  estimatedItemHeight: number
}>()

// 创建 0 到 999 的数组
// new Array(1000).fill(0).map((_, i) => i)
// Array.from(Array(1000).keys())
// Array.from({ length: 1000 }, (_, i) => i)
const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  words: faker.lorem.words(),
  paragraphs: faker.lorem.sentences(),
}))

const bufferSize = 3
// 缓存所有渲染过的元素的高度
// e[0] = 第一个元素的高度
// n > 0 时：e[n] = e[n-1] + 当前索引元素的高度，n 为当前索引
const accItemHeights = ref<number[]>(
  data.map((_, i) => props.estimatedItemHeight * (i + 1)),
)
// 使用渲染之后的元素的平均高度来校准容器的高度
const avgHeight = computed(() => {
  const { length } = accItemHeights.value
  return accItemHeights.value[length - 1] / length
})

// 计算可视区域内的元素个数
const visibleCount = computed(() =>
  Math.ceil(props.height / props.estimatedItemHeight),
)
const start = ref(0)
const visibleData = computed(() =>
  data.slice(
    Math.max(0, start.value - bufferSize),
    start.value + visibleCount.value + bufferSize,
  ),
)

const topPadding = computed(() => {
  const offset = start.value - bufferSize
  return offset > 0 ? accItemHeights.value[offset - 1] : 0
})
const container = shallowRef<HTMLDivElement | null>(null)
const itemRefs = ref<HTMLDivElement[]>([])

const isEstimated = (index: number) =>
  accItemHeights.value[index] === (index + 1) * props.estimatedItemHeight

watchEffect(() => {
  itemRefs.value.forEach((ref) => {
    const index = +ref.id
    if (isEstimated(index)) {
      const { height } = ref.getBoundingClientRect()
      accItemHeights.value[index] =
        index > 0 ? accItemHeights.value[index - 1] + height : height
    }
  })
})

let _scrollTop = 0
// 缓存锚点元素的位置信息，默认为第一个元素
const anchor = {
  top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量
  bottom: props.estimatedItemHeight, // 锚点元素的底部距离第一个元素的顶部的偏移量
}

const updateAnchor = (scrollTop: number) => {
  start.value = accItemHeights.value.findIndex((height) => height >= scrollTop)
  anchor.top = start.value * props.estimatedItemHeight
  anchor.bottom = anchor.top + props.estimatedItemHeight
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
