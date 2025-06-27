<script setup>
import {
  build,
  framework,
  orm,
  utils,
  form,
  test,
} from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# Go

## 开发工具

<NavContainer :items="build" />

## 框架

<NavContainer :items="framework" />

## ORM

<NavContainer :items="orm" />

## 通用库

<NavContainer :items="utils" />

## 表单

<NavContainer :items="form" />

## 测试

<NavContainer :items="test" />
