# HTTP

## 版本

### HTTP/0.9

最早版本的 HTTP 并没有版本号，后来为了与之后的版本进行区分，把该版本 HTTP 称为 HTTP/0.9，有时也叫做单行（one-line）协议。

该版本 HTTP 极其简单：请求由单行指令构成。以唯一可用方法 [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 开头，其后跟目标资源的路径。

```http
GET /example.html
```

响应只包含文档本身：

```html
<html>
  example
</html>
```

该版本的 HTTP 协议没有 HTTP 标头。只能传输 HTML 文件，不能传输其它类型文件。没有状态码。出现问题的时候会返回一个包含问题描述信息的 HTML 文件。

### HTTP/1.0

发布年份：1996 年。

无状态协议：服务器不保留关于客户端的任何数据。

连接类型：非持久连接。每个请求/响应对后，连接就关闭了，这造成了每次请求都需要重新建立连接。

性能限制：由于不支持持久连接，频繁的建立和关闭连接影响了性能。

相对于 HTTP/0.9，新增了以下：

- 协议版本信息现在会随着每个请求发送；
- 增加了状态码，使浏览器能了解请求执行成功或失败，并调整相应行为（如更新或使用本地缓存）；
- 引入 HTTP 标头的概念，无论是对于请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展性；
- 在新 HTTP 标头的帮助下，具备了传输其它类型文件的能力。

### HTTP/1.1

发布年份：1997 年。

持久连接：默认开启持久连接，允许在一个 TCP 连接上发送多个 HTTP 请求，减少了建立和关闭连接的开销。

管线化技术：允许在第一个应答被完全发送之前就发送第二个请求，以降低通信延迟，不过响应仍需按请求的顺序依次返回。

分块传输编码：允许服务器分块发送响应，提高了传输数据的效率。

缓存处理改进：引入了更复杂的缓存控制策略。

错误通知改进：增加了更多的状态码。

引入内容协商机制，包括语言、编码、类型等。并允许客户端和服务器之间约定以最合适的内容进行交换。

凭借 [Host](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Host) 标头，能够使不同域名配置在同一个 IP 地址的服务器上。

### HTTP/2

发布年份：2015 年。

二进制格式：HTTP 2.0 使用二进制而非文本格式，使得解析更高效。不再可读，也不可无障碍的手动创建，改善的优化技术现在可被实施。

多路复用：在同一个连接上并行交错地发送多个请求和响应，消除了 HTTP 1.x 中的队头阻塞问题。

首部压缩：HTTP 2.0 使用 HPACK 压缩格式减少了头部大小，降低了开销。因为标头在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。

服务器推送：允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。

### HTTP/3

发布年份：2019 年推出草案。

基于 [QUIC](https://developer.mozilla.org/en-US/docs/Glossary/QUIC)：HTTP 3.0 是基于 QUIC（Quick UDP Internet Connections）协议，而不是 TCP。QUIC 是基于 UDP 实现的。

减少连接延迟：QUIC 集成了 TLS 握手，减少了设置过程中必须交换的信息，加快了连接建立速度。

改进的拥塞控制：独立的流量控制，减少了数据包丢失对整个连接的影响。HTTP/2 的多路复用是运行在一个单独的 TCP 连接上的，意味着一旦有包丢失以及后续重新传输，会阻塞该连接上的所有 HTTP 事务。QUIC 通过 UDP 运行多个流，并且为每个流实现了包丢失检测和重传，这意味着包丢失只会阻塞丢失的那个流。

连接迁移：支持连接的无缝迁移，即使客户端的 IP 地址发生变化。

## References

- [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
