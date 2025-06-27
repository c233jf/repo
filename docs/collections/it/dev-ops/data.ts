import type { Item } from '@/components/NavContainer/NavContainer.vue'

export const dependency: Item[] = [
  {
    title: 'Renovate',
    description: '一个自动化的依赖更新工具，支持多平台、多语言',
    url: 'https://docs.renovatebot.com/',
  },
  {
    title: 'Mend',
    description: 'Renovate 的开发者平台',
    url: 'https://developer.mend.io/',
  },
  {
    title: 'ncu',
    description: '检查依赖的最新版本',
    url: 'https://github.com/raineorshine/npm-check-updates',
  },
]

export const github: Item[] = [
  {
    title: 'release-please',
    description: '自动化管理 release 的工具',
    url: 'https://github.com/googleapis/release-please',
  },
]

export const docker: Item[] = [
  {
    title: 'Docker',
    description: '一个开源的容器化平台',
    url: 'https://docs.docker.com/',
  },
  {
    title: 'Docker Hub',
    description: 'Docker 官方的镜像仓库',
    url: 'https://hub.docker.com/',
  },
]

export const monorepo: Item[] = [
  {
    title: 'Nx Cloud',
    description: 'Nx 的云服务，提供缓存、CI 等功能。',
    url: 'https://cloud.nx.app/orgs',
  },
]

export const server: Item[] = [
  {
    title: 'Nginx',
    description:
      'Nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器。',
    url: 'https://nginx.org/',
  },
]
