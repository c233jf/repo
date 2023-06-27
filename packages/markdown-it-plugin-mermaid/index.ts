import { PluginSimple } from 'markdown-it'

export const markdownItPluginMermaid: PluginSimple = (md) => {
  const defaultRenderer =
    md.renderer.rules.fence ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options))

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const content = token.content.trim()

    if (token.info.trim() !== 'mermaid')
      return defaultRenderer(tokens, idx, options, env, self)

    return `<pre class="mermaid">${content}</pre>`
  }
}
