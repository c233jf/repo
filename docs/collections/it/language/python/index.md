<script setup>
import {
  environment,
  bot,
} from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# Python

## 环境管理

<NavContainer :items="environment" />

## Bot

<NavContainer :items="bot" />
