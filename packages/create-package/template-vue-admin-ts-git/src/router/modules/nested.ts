import type { RouteRecordRaw } from 'vue-router'

import Layout from 'layout/Layout.vue'

export const nestedRoutes: RouteRecordRaw = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '路由嵌套',
  },
  children: [
    {
      path: 'menu1',
      component: () => import('views/nested/menu1/Menu1.vue'),
      name: 'Menu1',
      meta: { title: 'menu1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('views/nested/menu1/menu1-1/Menu1-1.vue'),
          name: 'Menu1-1',
          meta: { title: 'menu1-1' },
        },
        {
          path: 'menu1-2',
          component: () => import('views/nested/menu1/menu1-2/Menu1-2.vue'),
          name: 'Menu1-2',
          meta: { title: 'menu1-2', alwaysShow: true },
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          children: [
            {
              path: 'menu-1-2-1',
              component: () =>
                import('views/nested/menu1/menu1-2/menu1-2-1/Menu1-2-1.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'menu-1-2-1' },
            },
          ],
        },
      ],
    },
    {
      path: 'menu2',
      component: () => import('views/nested/menu2/Menu2.vue'),
      name: 'Menu2',
      meta: { title: 'menu2' },
    },
  ],
}
