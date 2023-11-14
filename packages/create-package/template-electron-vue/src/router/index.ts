import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('views/Home.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})
