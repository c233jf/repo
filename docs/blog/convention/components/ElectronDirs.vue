<template>
  <TreeWrap :data="data" />
</template>

<script setup lang="ts">
import type { TreeItem } from '../../../components/Tree/types'

const data: TreeItem[] = [
  {
    text: 'src',
    items: [
      {
        text: 'components',
        items: [
          {
            text: 'Dialog',
            collapsed: true,
            items: [
              {
                text: 'Dialog.vue',
              },
            ],
          },
        ],
        annotation: '组件目录',
      },
      {
        text: 'composables',
        items: [
          {
            text: 'useDialogState.ts',
          },
        ],
        annotation: '组合式函数目录',
      },
      {
        text: 'router',
        items: [
          {
            text: 'index.ts',
          },
        ],
        annotation: '路由目录',
      },
      {
        text: 'server',
        annotation:
          '在主进程上执行的文件，由于需要访问数据库，所以目录结构类似 Nestjs 的项目',
        items: [
          {
            text: 'database',
            collapsed: true,
            items: [
              {
                text: 'handler',
                collapsed: true,
                items: [
                  {
                    text: 'index.ts',
                  },
                  {
                    text: 'record.ts',
                    annotation: 'record 模块的 ipc handler',
                  },
                ],
              },
              {
                text: 'migrations',
                collapsed: true,
                items: [
                  {
                    text: '1666949227023-CreateUsersTable.ts',
                  },
                  {
                    text: 'index.ts',
                  },
                ],
              },
              {
                text: 'data-source.ts',
              },
              {
                text: 'entity.ts',
                annotation: '为了方便管理，在这里导入所有模块的实体并重新导出',
              },
              {
                text: 'util.ts',
              },
            ],
          },
          {
            text: 'records',
            collapsed: true,
            items: [
              {
                text: 'dto',
                collapsed: true,
                items: [
                  {
                    text: 'create-record.dto.ts',
                  },
                ],
              },
              {
                text: 'entities',
                collapsed: true,
                items: [
                  {
                    text: 'record.entity.ts',
                  },
                ],
              },
              {
                text: 'records.service.ts',
              },
            ],
            annotation: 'record 模块目录',
          },
        ],
      },
      {
        text: 'store',
        items: [
          {
            text: 'usePasswordRecord.ts',
          },
        ],
      },
      {
        text: 'utils',
        items: [
          {
            text: 'message.ts',
          },
        ],
      },
      {
        text: 'views',
        items: [
          {
            text: 'home',
            collapsed: true,
            items: [
              {
                text: 'Home.vue',
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>
