# 网页规范

## 页面跳转

对于多端的页面，**必须**添加自动跳转逻辑，例如：PC 端访问移动端页面自动跳转到 PC 端页面，反之依然。

PC 端页面：

```js
;(function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    location.href = 'PC 端页面地址'
  }
})()
```

移动端页面：

```js
;(function () {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    location.href = '移动端页面地址'
  }
})()
```
