# Markdown-It-Plugin-Katex

support katex for markdown-it

## Install

With npm:

`npm install markdown-it @chenjf/markdown-it-plugin-katex`

With yarn:

`yarn add markdown-it @chenjf/markdown-it-plugin-katex`

With pnpm:

`pnpm add markdown-it @chenjf/markdown-it-plugin-katex`

## Usage

Use it in your js

```ts
import md from 'markdown-it'
import mk from '@chenjf/markdown-it-plugin-katex'

md.use(mk)
```

Link the KaTeX CSS file

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
  integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
  crossorigin="anonymous"
/>
```

KaTeX options can be passed as second argument.

```ts
md.use(mk, { throwOnError: false })
```
