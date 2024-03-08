// #region external
export function loadCSS(src: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = src
  // 必须将 <link> 添加到 <head> 中，才能保证在所有浏览器中的行为一致。
  document.head.appendChild(link)
}
// #endregion external

// #region inline
export function loadStyle(styles: string) {
  const style = document.createElement('style')
  try {
    style.appendChild(document.createTextNode(styles))
  } catch (e) {
    // 与动态脚本类似，需要针对 IE 做特殊处理。
    if (style.styleSheet) {
      style.styleSheet.cssText = styles
    }
  }
  document.head.appendChild(style)
}
// #endregion inline
