// 参考 https://github.com/waylonflinn/markdown-it-katex
import { PluginWithOptions } from 'markdown-it'
import katex, { KatexOptions } from 'katex'

function mathInline(
  md: Parameters<PluginWithOptions>[0],
  options?: KatexOptions
) {
  md.inline.ruler.after('escape', 'math_inline', (state) => {
    const { src, pos } = state

    if (src[pos] !== '$') return false

    /**
     * This loop will assume that the first leading backtick can not
     * be the first character in state.src, which is known since
     * we have found an opening delimieter already.
     */
    const start = pos + 1
    let match = start

    while ((match = src.indexOf('$', match)) !== -1) {
      /**
       * Found potential $, look for escapes, prev will point to
       * first non escape when complete.
       */
      let prev = match - 1

      while (src[prev] === '\\') {
        prev--
      }
      // Even number of escapes, potential closing delimiter found.
      if ((match - prev) % 2 === 1) break
      match++
    }

    // No closing delimter found.
    if (match === -1) return false

    const token = state.push('math_inline', 'math', 0)
    token.markup = '$'
    token.content = src.slice(start, match)
    state.pos = match + 1
    return true
  })

  md.renderer.rules.math_inline = (tokens, idx) => {
    return katex.renderToString(tokens[idx].content, {
      ...options,
      throwOnError: false,
    })
  }
}

function mathBlock(
  md: Parameters<PluginWithOptions>[0],
  options?: KatexOptions
) {
  md.block.ruler.after(
    'blockquote',
    'math_block',
    (state, start, end) => {
      const { bMarks, eMarks, tShift, src, blkIndent } = state
      let pos = bMarks[start] + tShift[start]
      let max = eMarks[start]

      if (pos + 2 > max || src.slice(pos, pos + 2) !== '$$') return false

      pos += 2
      let firstLine = src.slice(pos, max).trim()
      let lastLine = ''
      let found = false

      if (firstLine.slice(-2) === '$$') {
        // Single line expression
        firstLine = firstLine.slice(0, -2)
        found = true
      }

      let next = start + 1

      while (!found) {
        if (next >= end) break

        pos = bMarks[next] + tShift[next]
        max = eMarks[next]

        if (pos < max && tShift[next] < blkIndent) break
        if (src.slice(pos, max).trim().slice(-2) === '$$') {
          lastLine = src.slice(pos, src.slice(0, max).lastIndexOf('$$'))
          found = true
        }
        next++
      }

      state.line = next
      const token = state.push('math_block', 'math', 0)
      token.block = true
      token.content =
        firstLine +
        '\n' +
        state.getLines(start + 1, next - 1, tShift[start], true) +
        lastLine
      token.map = [start, state.line]
      token.markup = '$$'
      return true
    },
    {
      alt: ['paragraph', 'reference', 'blockquote', 'list'],
    }
  )

  md.renderer.rules.math_block = (tokens, idx) => {
    return katex.renderToString(tokens[idx].content, {
      ...options,
      displayMode: true,
      throwOnError: false,
    })
  }
}

export const markdownItPluginKatex: PluginWithOptions<KatexOptions> = (
  md,
  options
) => {
  mathInline(md, options)
  mathBlock(md, options)
}
