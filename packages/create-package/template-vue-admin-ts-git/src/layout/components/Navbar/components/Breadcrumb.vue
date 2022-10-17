<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem
      v-for="(item, index) in levelList"
      :key="item.path"
      :to="breadcrumbItemRoute(item, index)"
    >
      {{ item.meta.title }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()

const levelList = computed(() => {
  // only show routes with meta.title
  let matched = route.matched.filter(
    (e) => e.meta.title && e.meta.breadcrumb !== false
  )
  const first = matched[0]

  if (first.path !== '/') {
    matched = (
      [{ path: '/', meta: { title: '首页' } }] as RouteLocationMatched[]
    ).concat(matched)
  }

  return matched
})

const breadcrumbItemRoute = (item: RouteLocationMatched, index: number) => {
  return item.meta.noRedirect || index === levelList.value.length - 1
    ? undefined
    : item
}
</script>
