# CSS3

## 新特性

- 过渡

```css
.example {
  transition: all, 0.5s;
}
```

- 动画

```css
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

- 形状转换

```css
.example {
  transform: translate(30px, 30px);
  transform: rotate(30deg);
  transform: scale(0.8);
}
```

三维变换请看[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transforms/Using_CSS_transforms#%E9%80%82%E7%94%A8%E4%BA%8E%E4%B8%89%E7%BB%B4%E7%9A%84%E5%B1%9E%E6%80%A7)。

- 选择器

  - `nth-of-type()`

- 阴影

  - 文字阴影

  ```css
  .example {
    text-shadow: 2px 2px 2px #000; /* 水平阴影，垂直阴影，模糊距离，阴影颜色 */
  }
  ```

  - 盒子阴影

  ```css
  .example {
    box-shadow: 10px 10px 5px #999;
  }
  ```

- 边框

```css
.example {
  border-image: url(border.png);
}
```

- 背景
- 文字
- 渐变

```css
.simple-linear {
  background: linear-gradient(blue, pink);
}
```

- filter（滤镜）

```css
.example {
  filter: blur(5px);
}
```

- 布局

  - 弹性布局

  ```css
  .example {
    display: flex;
  }
  ```

  - 栅格布局

  ```css
  .example {
    display: grid;
  }
  ```

  - 多列布局

  ```css
  .container {
    column-count: 3;
  }
  ```

- 媒体查询

```html
<link rel="stylesheet" src="styles.css" media="screen" />
<link rel="stylesheet" src="styles.css" media="print" />
```

```css
/* 针对打印机 */
@media print {
  /* ... */
}

/* 针对屏幕和打印机 */
@media screen, print {
  /* ... */
}

/* 仅当你的浏览器的 viewport 宽度等于或小于 12450px 时，此 CSS 才会应用样式 */
@media (max-width: 12450px) {
  /* ... */
}
```

- CSS 变量

```css
:root {
  --form-elem-height: 2rem;
  --top-nav-height: 4rem;
  --article-actions-container-height: 2rem;
  --icon-size: 1rem;
  --sticky-header-without-actions-height: calc(var(--top-nav-height) + 1px);
  --sticky-header-with-actions-height: calc(
    var(--sticky-header-without-actions-height) + var(
        --article-actions-container-height
      ) + 1px
  );
}
```
