import type { RouteLocationNormalizedLoaded } from 'vue-router'

export type TagsRouteRecordRaw = Pick<
  RouteLocationNormalizedLoaded,
  'meta' | 'name' | 'fullPath'
>

export const useTagsViewStore = defineStore('tags-view', () => {
  const visitedViews = ref<TagsRouteRecordRaw[]>([])
  const cachedViews = ref<TagsRouteRecordRaw[]>([])
  const cachedViewsName = computed(() =>
    cachedViews.value.map((e) => e.name as string)
  )

  const addVisitedView = (route: TagsRouteRecordRaw) => {
    if (visitedViews.value.some((e) => e.fullPath === route.fullPath)) return
    visitedViews.value.push(route)
  }

  const addCachedView = (route: TagsRouteRecordRaw) => {
    if (
      typeof route.name !== 'string' ||
      cachedViewsName.value.includes(route.name) ||
      route.meta?.noCache
    ) {
      return
    }
    cachedViews.value.push(route)
  }

  const addView = (route: TagsRouteRecordRaw) => {
    addCachedView(route)
    addVisitedView(route)
  }

  const delVisitedView = (route: TagsRouteRecordRaw) => {
    const index = visitedViews.value.findIndex(
      (e) => e.fullPath === route.fullPath
    )
    if (index > -1) {
      visitedViews.value.splice(index, 1)
    }
    return visitedViews.value.slice()
  }

  const delCachedView = (route: TagsRouteRecordRaw) => {
    const _cachedViews = cachedViews.value.slice()
    if (typeof route.name !== 'string') return _cachedViews

    const index = cachedViewsName.value.indexOf(route.name)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
    return cachedViews.value.slice()
  }

  const delView = (route: TagsRouteRecordRaw) => {
    return {
      visitedViews: delVisitedView(route),
      cachedViews: delCachedView(route),
    }
  }

  const delOtherVisitedView = (route: TagsRouteRecordRaw) => {
    visitedViews.value = visitedViews.value.filter(
      (e) => e.meta.affix || e.fullPath === route.fullPath
    )
    return visitedViews.value.slice()
  }

  const delOtherCachedView = (route: TagsRouteRecordRaw) => {
    cachedViews.value = route.meta.noCache ? [] : [route]
    return cachedViews.value.slice()
  }

  const delOtherViews = (route: TagsRouteRecordRaw) => {
    return {
      visitedViews: delOtherVisitedView(route),
      cachedViews: delOtherCachedView(route),
    }
  }

  const delAllVisitedViews = () => {
    // keep affix tags
    visitedViews.value = visitedViews.value.filter((e) => e.meta.affix)
    return visitedViews.value.slice()
  }

  const delAllCachedViews = () => {
    cachedViews.value = []
    return cachedViews.value.slice()
  }

  const delAllViews = () => {
    return {
      visitedViews: delAllVisitedViews(),
      cachedViews: delAllCachedViews(),
    }
  }

  return {
    visitedViews,
    cachedViews,
    cachedViewsName,
    addView,
    addCachedView,
    addVisitedView,
    delView,
    delCachedView,
    delOtherViews,
    delAllViews,
  }
})
