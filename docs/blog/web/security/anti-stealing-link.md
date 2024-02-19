---
prev: false
---

# 防盗链

**防盗链**是一种保护服务器资源的技术，可以防止其它网站直接使用你服务器的资源，从而减少服务器带宽流量消耗和防止资源被盗用。

## 实现

本文中的示例都使用 [nginx](http://nginx.org/en/docs/) 进行设置

### Referer 请求头

当浏览器向服务器发送请求时，一般会带上 `Referer` 请求头。`Referer` 包含了当前请求页面的来源页面的地址。服务器可以通过请求头中 `Referer` 的地址来判断是否禁止某些来源的网站访问资源。

#### 示例

```nginx
location ~ .*\.(wma|wmv|asf|mp3|mmf|zip|rar|jpg|gif|png|swf|flv|mp4)$ {
    # 如果链接被防火墙标记过，则值为 blocked
    valid_referers none blocked 你的网站域名;
    if ($invalid_referer) {
        # 这里也可以用rewrite /path/to/img.jpg 来显示一张提示防盗链的图片
        return 403;
    }
}
```

#### 缺点

在以下情况下，浏览器不会发送 `Referer` 头部：

- 直接在浏览器地址栏输入 url 访问资源时
- 请求资源采用的协议为表示本地文件的“file”或者“data”URL
- 当前页面采用的是非安全协议，而请求资源采用的是安全协议（HTTPS）

由于 `Referer` 有可能会出现空的情况，所以服务器一般会允许 `Referer` 为空的来源访问。基于此，我们可以通过让请求不发送 `Referer` 头部来绕过防盗链。方法如下：

- 设置 HTTP 请求头中 `Referrer-Policy` 值为 `no-referrer`
- 使用 `meta` 元素为整个文档设置 `referrer` 策略。例如：`<meta name="referrer" content="no-referrer">`
- 使用 `a`、`area`、`img`、`iframe`、`script` 或者 `link` 元素上的 `referrerpolicy` 属性为其设置独立的请求策略。例如：`<a href="http://example.com" referrerpolicy="no-referrer">`
- 也可以在 `a`、`area` 或者 `link` 元素上将 `rel` 属性设置为 `noreferrer`。例如：`<a href="http://example.com" rel="noreferrer">`

### 在 url 中设置验证参数

还有另一种方法就是使用 nginx secure_link，详情请自行查询。

## References

- [Referer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)
- [Referrer-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)
- [盗链及防盗链](https://www.xiebruce.top/1799.html)
