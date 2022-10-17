import type { ShallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { asyncRoutes, constantRoutes } from 'router/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  return route.meta?.roles
    ? roles.some((e) => route.meta!.roles!.includes(e))
    : true
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []

  routes.forEach((e) => {
    if (hasPermission(roles, e)) {
      if (e.children) {
        e.children = filterAsyncRoutes(e.children, roles)
      }
      res.push(e)
    }
  })
  return res
}

const usePermissionStore = defineStore<
  'permission',
  {
    routes: ShallowRef<RouteRecordRaw[]>
    addRoutes: ShallowRef<RouteRecordRaw[]>
    removabledRoutes: (() => void)[]
    generateRoutes: (roles: string[]) => RouteRecordRaw[]
    removeRoutes: () => void
  }
>('permission', () => {
  const routes = shallowRef<RouteRecordRaw[]>([])
  const addRoutes = shallowRef<RouteRecordRaw[]>([])
  const removabledRoutes: (() => void)[] = []

  const generateRoutes = (roles: string[]) => {
    let accessedRoutes: RouteRecordRaw[] = []
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    routes.value = constantRoutes.concat(accessedRoutes)
    addRoutes.value = accessedRoutes
    return accessedRoutes
  }

  const removeRoutes = () => {
    removabledRoutes.forEach((e) => {
      e()
    })
  }

  return { routes, addRoutes, removabledRoutes, generateRoutes, removeRoutes }
})

export { filterAsyncRoutes, usePermissionStore }
