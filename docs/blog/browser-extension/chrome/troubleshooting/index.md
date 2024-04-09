---
next: false
---

# Troubleshooting

## Uncaught Error: Extension context invalidated

**背景**

在打开的 `tab` 页中插入了 content script，script 中使用 `chrome.runtime.sendMessage()` 向 `background` 发送消息。在重新加载扩展后，在之前的 `tab` 页中使用 `chrome.runtime.sendMessage()` 会出现 `Uncaught Error: Extension context invalidated` 错误。

**原因**

当一个扩展被卸载时，现存的 content scripts 会丢失与扩展其它部分的连接 —— 也就是端口关闭了，content scripts 就不能使用 `chrome.runtime.sendMessage()` 向 `background` 发送消息。但是由于这些 content scripts 早已经被注入到网页中，所以它们还能继续运行。

当一个扩展被重新加载时也是一样的。此外，由于在扩展加载之后向 `tab` 页注入 content scripts 是一种常见的做法（在 Chrome 上这种做法很常见，由于 Firefox 会自动注入，所以 Firefox 扩展不需要这种做法），最终一个 `tag` 页会存在多份 content script 的拷贝：原始的，现在已丢失连接的和当前的，与扩展进行连接的。

当你在以下情况使用 content script 时就会出现问题：

- 原始的 content script 尝试访问扩展的其它部分；
- 原始的 content script 会修改 DOM 结构，这种修改最终会进行多次。

::: info
Firefox 会自动卸载 content scripts。所以不需要担心这个问题。

如果你在 Chrome 浏览器的开发者工具中查看内容脚本的话，只能看到当前注入的内容脚本，之前已经注入的是看不见的。
:::

**解决方案**

首先禁用掉原始注入的 content scripts。有以下两种方法：

**1. 回退到只在 content script 内完成所需功能**

如果你的扩展无需 `background` 也能运行得很好，那这个解决方案可能是可接受的。例如，你的 content script 只是做一些 DOM 修改或者跨域请求。

你可以使用如下方法检测 `chrome.runtime` 是否仍然能够使用。

```js
// It turns out that getManifest() returns undefined when the runtime has been
// reload through chrome.runtime.reload() or after an update.
function isValidChromeRuntime() {
  // It turns out that chrome.runtime.getManifest() returns undefined when the
  // runtime has been reloaded.
  // Note: If this detection method ever fails, try to send a message using
  // chrome.runtime.sendMessage. It will throw an error upon failure.
  return !!chrome.runtime?.getManifest()
}

// E.g.
if (isValidChromeRuntime()) {
  chrome.runtime.sendMessage()
} else {
  // Fall back to contentscript-only behavior
}
```

**2. 卸载之前注入的 content script**

如果连接到 `background` 对你的 content script 是很重要的话，那你就不得不实现一个适当的卸载程序，并且设置一些事件来触发这个程序。

在你的 content script 里实现类似如下代码。

```js
// Content script
function main() {
  // Set up content script
}

function destructor() {
  // Destruction is needed only once
  document.removeEventListener(destructionEvent, destructor)
  // Tear down content script: Unbind events, clear timers, restore DOM, etc.
}

var destructionEvent = 'destructmyextension_' + chrome.runtime.id
// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(destructionEvent))
document.addEventListener(destructionEvent, destructor)
main()
```

::: warning
如果网页知道触发 `destructor()` 的事件名的话，它可以主动触发该事件以卸载你的 content script。
:::

然后再重新注入 content script。

```js
chrome.runtime.onInstalled.addListener(async () => {
  for (const tab of await chrome.tabs.query({ url: '要运行扩展的网页 url' })) {
    if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
      continue
    }
    chrome.scripting.executeScript({
      files: ['你的 content scripts'],
      target: { tabId: tab.id },
    })
  }
})
```

还有另一种方案（未验证是否可行）：

通过 `onInstalled` 事件判断是注入 content scripts 还是连接到 `tab` 页。

```js
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    for (const tab of await chrome.tabs.query({
      url: '要运行扩展的网页 url',
    })) {
      if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
        continue
      }
      chrome.scripting.executeScript({
        files: ['你的 content scripts'],
        target: { tabId: tab.id },
      })
    }
  } else {
    for (const tab of await chrome.tabs.query({
      url: '要运行扩展的网页 url',
    })) {
      if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
        continue
      }
      chrome.tabs.connect(tab.id)
    }
  }
})
```

**参考**

- [How to avoid "Extension context invalidated" errors when messaging AFTER an Extension update?](https://stackoverflow.com/questions/53939205/how-to-avoid-extension-context-invalidated-errors-when-messaging-after-an-exte?newreg=1a3b3b95e9d2405faca4b97237d6be9e)
- [chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension](https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023)
- [Chrome extension content script re-injection after upgrade or install](https://stackoverflow.com/questions/10994324/chrome-extension-content-script-re-injection-after-upgrade-or-install/11598753#11598753)
