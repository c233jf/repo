---
prev: false
---

# Mini Vue

实现一个非常简单的 Vue 框架

Vue 可以分为三个核心模块：

- [Reactivity Module](./reactivity/)
- [Compiler Module](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) —— 这里不会实现编译器模块，有兴趣可以查看源码
- [Renderer Module](./renderer/)

流程图如下:

```mermaid
flowchart TD
  subgraph Compiler
    Template[/Template/] --> Compiled --> H[/Optimized render function/]
  end

  subgraph Reactivity
    Var[/Var/] --> Initialize --> RV[/Reactive var/] --> Watch --> W{Is changed?}
  end
  RV -.-> |Reference| H

  subgraph Renderer
    Page([Page])
    Render --> VNode[/VNode/] --> Mount --> |Create| Page
    Rerender --> NewNode[/New node/]
    NewNode & OldNode[/Old node/] --> Patch --> Compare --> |Update only the Part that have changed| Page
  end
  H --> |Invoke| Render
  H --> |Invoke| Rerender
  W --> |Yes| Rerender
```
