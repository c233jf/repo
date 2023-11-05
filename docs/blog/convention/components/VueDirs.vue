<template>
  <TreeWrap :data="data" />
</template>

<script setup lang="ts">
import type { TreeItem } from '../../../components/Tree/types'

const data: TreeItem[] = [
  {
    text: 'public',
    items: [
      {
        text: 'favicon.ico',
      },
    ],
    annotation:
      '静态资源目录，构建时会被复制到 dist 目录，无需经过打包工具处理',
  },
  {
    text: 'src',
    items: [
      {
        text: 'api',
        items: [
          {
            text: 'user',
            collapsed: true,
            items: [
              {
                text: 'index.ts',
              },
              {
                text: 'types.ts',
              },
            ],
          },
        ],
        annotation: '接口请求目录',
      },
      {
        text: 'assets',
        items: [
          {
            text: 'logo.png',
          },
        ],
        annotation: '静态资源目录，需要被打包工具处理',
      },
      {
        text: 'components',
        items: [
          {
            text: 'Tree',
            collapsed: true,
            items: [
              {
                text: 'Tree.vue',
              },
            ],
          },
        ],
        annotation: '公共组件目录',
      },
      {
        text: 'composables',
        items: [
          {
            text: 'useUser.ts',
          },
        ],
        annotation: '组合函数目录',
      },
      {
        text: 'layout',
        items: [
          {
            text: 'Layout.vue',
          },
        ],
        annotation: '布局组件目录',
      },
      {
        text: 'router',
        items: [
          {
            text: 'index.ts',
          },
          {
            text: 'modules',
            collapsed: true,
            items: [
              {
                text: 'user.ts',
              },
            ],
          },
        ],
        annotation: '路由目录',
      },
      {
        text: 'store',
        items: [
          {
            text: 'useUserStore.ts',
          },
        ],
        annotation: '全局状态管理器目录',
      },
      {
        text: 'utils',
        items: [
          {
            text: 'request.ts',
          },
        ],
        annotation: '工具函数目录',
      },
      {
        text: 'views',
        items: [
          {
            text: 'Home.vue',
          },
          {
            text: 'user',
            collapsed: true,
            items: [
              {
                text: 'User.vue',
              },
            ],
          },
        ],
        annotation: '页面目录',
      },
    ],
  },
]
</script>
