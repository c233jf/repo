<script setup>
import { editors, debuggers } from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# 开发工具

## 编辑器

<NavContainer :items="editors" />

## 调试

<NavContainer :items="debuggers" />
