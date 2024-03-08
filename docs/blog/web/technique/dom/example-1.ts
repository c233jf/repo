// #region external
export function loadScript(src: string) {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
}
// #endregion external

// #region inline
export function loadInlineScript(code: string) {
  const script = document.createElement('script')
  try {
    script.appendChild(document.createTextNode(code))
  } catch (e) {
    // 上面的代码在 IE 中会报错，IE 将 <script> 视为一个特殊元素，不允许 DOM
    // 访问其子节点。不过我们可以通过 text 属性来插入代码。
    script.text = code
  }
  document.body.appendChild(script)
}
// #endregion inline
