import type { Item } from '@/components/NavContainer/NavContainer.vue'

export const build: Item[] = [
  {
    title: 'air',
    description: ' Go 应用程序的实时重新加载',
    url: 'https://github.com/air-verse/air',
  },
]

export const framework: Item[] = [
  {
    title: 'Kratos',
    description: '一套轻量级 Go 微服务框架，包含大量微服务相关功能及工具。',
    url: 'https://github.com/go-kratos/kratos',
  },
  {
    title: 'Gin',
    description: 'Gin 是一个高性能、极简的 HTTP Web 框架',
    url: 'https://gin-gonic.com/',
  },
]

export const orm: Item[] = [
  {
    title: 'GORM',
    description: 'Go 的 ORM 库',
    url: 'https://gorm.io/zh_CN/',
  },
]

export const utils: Item[] = [
  {
    title: 'goutil',
    description:
      'Go 常用的一些工具函数：数字，字符串，数组，Map，结构体，反射，文本，文件，错误，时间日期，特殊处理，格式化，常用信息获取等等',
    url: 'https://github.com/gookit/goutil',
  },
  {
    title: 'lo',
    description: 'Lodash 风格 Go 库',
    url: 'https://github.com/samber/lo',
  },
]

export const form: Item[] = [
  {
    title: 'govalidator',
    description: '使用简单规则验证请求数据',
    url: 'https://github.com/thedevsaddam/govalidator',
  },
]

export const test: Item[] = [
  {
    title: 'testify',
    description: '带有通用断言和模拟的工具包，可与标准库完美配合',
    url: 'https://github.com/stretchr/testify',
  },
]
