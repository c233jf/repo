<script setup>
import {
  relational,
  nonRelational,
} from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# 数据库

## 关系型

<NavContainer :items="relational" />

## 非关系型

<NavContainer :items="nonRelational" />
