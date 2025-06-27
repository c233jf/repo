<script setup>
import {
  assembly,
  memory,
  crawler,
} from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# 逆向工具

## 汇编

<NavContainer :items="assembly" />

## 内存

<NavContainer :items="memory" />

## 爬虫

<NavContainer :items="crawler" />
