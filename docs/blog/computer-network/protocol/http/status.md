# HTTP 响应状态码

HTTP 响应状态码用来表明特定 [HTTP](./index.md) 请求是否成功完成。 响应被归为以下五大类：

## 信息响应

### 101 Switching Protocols

该代码是响应客户端的 [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) 请求头发送的，指明服务器即将切换的协议。

**使用场景**：

一般在使用 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API) 的时候会发送一个带有 [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) 头部的请求，返回的响应状态码便是 101。

## 成功响应

### 200 OK

请求成功。成功的含义取决于 HTTP 方法：

- `GET`：资源已被提取并在消息正文中传输；
- `HEAD`：实体标头位于消息正文中；
- `PUT`、`POST` or `PATCH`：描述动作结果的资源在消息体中传输；
- `TRACE`：消息正文包含服务器收到的请求消息。

**使用场景**：

一般用于 `GET` 请求中。

### 201 Created

该请求已成功，并因此创建了一个新的资源。

**使用场景**：

一般用于 `POST` 请求中。

### 204 No Content

表示该请求已经成功了，但是客户端客户不需要离开当前页面。

对于该请求没有可发送的内容，但头部字段可能有用。用户代理可能会用此时请求头部信息来更新原来资源的头部缓存字段。

**使用场景**：

- 在 `PUT` 请求中进行资源更新，但是不需要改变当前展示给用户的页面，那么返回 204 No Content；
- 客户端埋点，收集用户习惯。

### 206 Partial Content

表示请求已成功，并且主体包含所请求的数据区间，该数据区间是在请求的 [Range](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Range) 首部指定的。

如果只包含一个数据区间，那么整个响应的 [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 首部的值为所请求的文件的类型，同时包含 [Content-Range](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Range) 首部。

如果包含多个数据区间，那么整个响应的 [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 首部的值为 `multipart/byteranges` ，其中一个片段对应一个数据区间，并提供 [Content-Range](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Range) 和 [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 描述信息。

**使用场景**：

文件下载。

## 重定向消息

### 301 Moved Permanently

请求的资源已经被移动到了由 [Location](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Location) 头部指定的 url 上，是固定的不会再改变。搜索引擎会根据该响应修正。

**使用场景**：

永久重定向。

### 302 Found

请求的资源被暂时的移动到了由该 HTTP 响应的响应头 [Location](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Location) 指定的 URL 上。浏览器会重定向到这个 URL，但是搜索引擎不会对该资源的链接进行更新 (In SEO-speak, it is said that the link-juice is not sent to the new URL)。

**使用场景**：

临时性重定向。

### 303 See Other

通常作为 [PUT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT) 或 [POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 操作的返回结果，它表示重定向链接指向的不是新上传的资源，而是另外一个页面，比如消息确认页面或上传进度页面。而请求重定向页面的方法要总是使用 [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)。

**使用场景**：

在使用 [PUT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT) 方法进行文件上传操作时，需要返回确认信息（例如“你已经成功上传了 xyz”）而不是上传的资源本身，就可以使用这个状态码。

### 304 Not Modified

无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法，例如 [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 或 [HEAD](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD) 或在请求中附带了头部信息： [If-None-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-None-Match) 或 [If-Modified-Since](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Modified-Since)。

该响应必须不包含主体，并且必须包含在等价 200 OK 响应中会带有的 [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)、[Content-Location](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Location)、[Date](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Date)、[ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)、[Expires](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires) 和 [Vary](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Vary) 标头。

**使用场景**：

通常用于 [HTTP 缓存验证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%AA%8C%E8%AF%81%E5%93%8D%E5%BA%94)中。

## 客户端错误响应

### 400 Bad Request

服务器因某些被认为是客户端错误的原因（例如，请求语法错误、无效请求消息格式或者欺骗性请求路由），而无法或不会处理该请求。

**使用场景**：

一般用于客户端传参错误。

### 401 Unauthorized

由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。

**使用场景**：

一般用于在发送需要认证的请求时，没有携带认证信息，例如没有在 [Authorization](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Authorization) 头中提供凭据。

### 403 Forbidden

服务器端有能力处理该请求，但是拒绝授权访问。

**使用场景**：

- 在认证的时候认证信息过期；
- 认证信息出错；
- 提供的认证信息没有足够的权限访问对应资源。

### 404 Not Found

服务器找不到请求的资源。在浏览器中，这意味着无法识别 URL。在 API 中，这也可能意味着端点有效，但资源本身不存在。服务器也可以发送此响应，而不是 `403 Forbidden`，以向未经授权的客户端隐藏资源的存在。

**使用场景**：

- 请求的资源不存在；
- 向没有足够权限的用户隐藏请求的资源。

## 服务端错误响应

### 500 Internal Server Error

服务器遇到了不知道如何处理的情况。

**使用场景**：

一般是服务端代码出 BUG。

### 502 Bad Gateway

作为网关或代理的服务器，从上游服务器中接收到的响应是无效的。

**使用场景**：

由于在实际生产环境中，服务端通常会使用 [nginx](http://nginx.org/en/docs/) 之类的 HTTP 服务器对实际的服务端应用程序做反向代理，一旦服务端应用报错，就有可能生成该响应。

### 503 Service Unavailable

服务器尚未处于可以接受请求的状态。

**使用场景**：

一般用于服务器停机维护或者已超载的时候。

### 504 Gateway Timeout

扮演网关或者代理的服务器无法在规定的时间内获得想要的响应。

**使用场景**：

一般可能出现在服务端应用阻塞的情况下，此时会返回该状态码。

## References

- [HTTP 响应状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
