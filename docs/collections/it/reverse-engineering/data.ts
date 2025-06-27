import type { Item } from '@/components/NavContainer/NavContainer.vue'

export const assembly: Item[] = [
  {
    title: 'x64dbg',
    description:
      '用于 Windows 上的开源的二进制调试器，主要目的是恶意软件分析和逆向工程没有源码的可执行文件',
    url: 'https://github.com/x64dbg/x64dbg',
  },
]

export const memory: Item[] = [
  {
    title: 'CE',
    description:
      '内存修改器。最好使用自己编译的版本，官方安装器是第三方制作的，带有广告软件 [参考](https://github.com/cheat-engine/cheat-engine/issues/2315)',
    url: 'https://github.com/cheat-engine/cheat-engine',
  },
]

export const crawler: Item[] = [
  {
    title: 'Colly',
    description: '适用于 Go 开发者的快速而优雅的爬虫框架',
    url: 'https://go-colly.org/',
  },
]
