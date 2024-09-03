# 代码分块（Chunking）

把代码分成多个 Chunk 文件，使得一个大的请求分割成多个小的请求，同时利用浏览器的并发请求达到减少请求时间加快文档加载的目的。

通常当你使用异步加载模块或异步路由等方法时，打包器会自动把该模块或路由打包成一个 Chunk 文件。

## 优势

- 减少单个请求大小
- 获得更好的缓存

## 缺点

- 不合理的 Chunking 会产生过多的请求，可能会影响请求时间

## 参考

请在 Vite [文档](https://cn.vitejs.dev/)中搜索 chunk 关键字以查看详细内容。