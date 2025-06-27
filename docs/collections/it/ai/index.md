<script setup>
import { chat, translators } from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# AI

## 翻译

<NavContainer :items="translators" />

## Chat

<NavContainer :items="chat" />
