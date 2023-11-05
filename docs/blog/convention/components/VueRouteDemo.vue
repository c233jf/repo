<template>
  <TreeWrap :data="data" />
</template>

<script setup lang="ts">
import type { TreeItem } from '../../../components/Tree/types'

const data: TreeItem[] = [
  {
    text: 'views',
    items: [
      {
        text: 'user',
        items: [
          {
            text: 'User.vue',
          },
          {
            text: 'detail',
            items: [
              {
                text: 'UserDetail.vue',
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>
