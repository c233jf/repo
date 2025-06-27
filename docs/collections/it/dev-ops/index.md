<script setup>
import { dependency, github, docker, monorepo, server } from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# 运维

## 依赖管理

<NavContainer :items="dependency" />

## Github

<NavContainer :items="github" />

## Docker

<NavContainer :items="docker" />

## Monorepo

<NavContainer :items="monorepo" />

## Server

<NavContainer :items="server" />
