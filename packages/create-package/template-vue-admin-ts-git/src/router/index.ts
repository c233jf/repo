import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { nestedRoutes } from './modules/nested'

import Layout from 'layout/Layout.vue'
import EpHomeFilled from '~icons/ep/home-filled'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('views/login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      whiteList: true,
    },
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('views/profile/Profile.vue'),
        name: 'Profile',
        meta: { title: '个人中心' },
      },
    ],
    meta: { hidden: true },
  },
]

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('views/Home.vue'),
        name: 'Home',
        meta: {
          icon: EpHomeFilled,
          title: '首页',
          affix: true,
        },
      },
    ],
  },
  nestedRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export { constantRoutes, asyncRoutes, router }
