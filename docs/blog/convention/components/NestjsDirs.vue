<template>
  <TreeWrap :data="data" />
</template>

<script setup lang="ts">
import type { TreeItem } from '../../../components/Tree/types'

const data: TreeItem[] = [
  {
    text: 'database',
    items: [
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
        annotation: '数据库迁移文件目录',
      },
      {
        text: 'seeds',
        collapsed: true,
        items: [
          {
            text: '1692755649489-users.ts',
          },
          {
            text: 'index.ts',
          },
        ],
        annotation: '数据库填充文件目录',
      },
      {
        text: 'data-source.ts',
      },
      {
        text: 'entity.ts',
        annotation: '为了方便管理，在这里导入 src 下的所有实体并重新导出',
      },
      {
        text: 'util.ts',
      },
    ],
  },
  {
    text: 'mocks',
    items: [
      {
        text: 'index.ts',
      },
      {
        text: 'user.ts',
      },
    ],
    annotation: '测试用的 Mock 目录',
  },
  {
    text: 'scripts',
    items: [
      {
        text: 'generate-key.ts',
        annotation: '生成 JWT 密钥的脚本',
      },
    ],
    annotation: '脚本目录',
  },
  {
    text: 'src',
    items: [
      {
        text: 'users',
        collapsed: true,
        items: [
          {
            text: 'dto',
            collapsed: true,
            items: [
              {
                text: 'create-user.dto.ts',
              },
            ],
          },
          {
            text: 'entities',
            collapsed: true,
            items: [
              {
                text: 'user.entity.ts',
              },
            ],
          },
          {
            text: 'policies',
            collapsed: true,
            items: [
              {
                text: 'user.create.ts',
              },
            ],
            annotation: '策略目录',
          },
          {
            text: 'users.controller.spec.ts',
            annotation: '控制器单元测试文件',
          },
          {
            text: 'users.controller.ts',
            annotation: '控制器文件',
          },
          {
            text: 'users.e2e-spec.ts',
            annotation: '端到端测试文件',
          },
          {
            text: 'users.module.ts',
            annotation: '模块文件',
          },
          {
            text: 'users.service.spec.ts',
            annotation: '服务单元测试文件',
          },
          {
            text: 'users.service.ts',
            annotation: '服务文件',
          },
        ],
        annotation: 'user 模块',
      },
      {
        text: 'utils',
        collapsed: true,
        items: [
          {
            text: 'log.ts',
          },
        ],
        annotation: '工具函数目录',
      },
      {
        text: 'app.controller.spec.ts',
      },
      {
        text: 'app.controller.ts',
      },
      {
        text: 'app.module.ts',
      },
      {
        text: 'app.service.ts',
      },
      {
        text: 'main.ts',
      },
      {
        text: 'module.ts',
        annotation: '放置 app module 使用的模块，方便管理',
      },
    ],
  },
]
</script>
