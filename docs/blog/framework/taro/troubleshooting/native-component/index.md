# 在 Taro 中使用原生组件遇到的坑

## callMethod error undefined is not object

这个坑是我使用 Taro 编写支付宝小程序并使用【码上有钱】保险勾选框组件（弹窗形态）时遇到的。

首先，我是按照 Taro 文档中使用原生模块的方法和【码上有钱】勾选框组件接入流程进行保险勾选框组件（弹窗形态）的接入。

::: code-group

```ts [app.config.ts]
export default defineAppConfig({
  plugins: {
    xlightPlugin: {
      version: '*',
      provider: '2021xxxxxxxxx',
    },
  },
})
```

```ts [page.config.ts]
export default definePageConfig({
  usingComponents: {
    'riding-risk-component-pop':
      'plugin://xlightPlugin/riding-risk-component-pop',
  },
})
```

```tsx [page.tsx]
export default function Page() {
  const [visible, setVisible] = useState(false)
  const ridingRiskRtaExtMap = {}
  const ridingRiskSpaceCode = '该code为申请的spaceCode'

  const onPopRiding = () => {
    setVisible(true)
  }

  const onPopupClose = () => {
    setVisible(false)
  }

  const onInsuranceStatus = () => {
    console.log('用户完成了投保动作')
  }

  const onSuccess = () => {
    console.log('广告加载成功')
  }

  const onClose = () => {
    console.log('广告关闭')
  }

  const onError = () => {
    console.log('广告加载失败')
  }

  return (
    <Button onClick={onPopRiding}>保险弹窗</Button>
    <riding-risk-component-pop
      visible={visible}
      onPopupClose={onPopupClose}
      onInsuranceStatus={onInsuranceStatus}
      spaceCode={ridingRiskSpaceCode}
      rtaExtMap={ridingRiskRtaExtMap}
      onSuccess={onSuccess}
      onClose={onClose}
      onError={onError}
    />
  )
}
```

:::

当我把打包后的产物放在开发者工具运行时就会报 `callMethod error undefined is not object` 这个错误。

**原因**：[请查看该 comment](https://github.com/NervJS/taro/issues/12571#issuecomment-1280338905)

**解决方法**：创建一个自定义组件包裹该原生组件。

假设项目源码都放置在 `src` 目录下。

`src/components` 目录下创建 `MyRidingRiskComponentPop` 目录，内容如下：
::: code-group

```html [index.axml]
<riding-risk-component-pop
  visible="{{visible}}"
  onPopupClose="onPopupClose"
  onInsuranceStatus="onInsuranceStatus"
  spaceCode="{{spaceCode}}"
  rtaExtMap="{{rtaExtMap}}"
  onSuccess="onSuccess"
  onClose="onClose"
  onError="onError"
/>
```

```json [index.json]
{
  "component": true,
  "usingComponents": {
    "riding-risk-component-pop": "plugin://xlightPlugin/riding-risk-component-pop"
  }
}
```

```js [index.js]
Component({
  props: {
    id: '',
    visible: false,
    spaceCode: '',
    rtaExtMap: {},
    onPopupClose: () => {},
    onInsuranceStatus: () => {},
    onSuccess: () => {},
    onClose: () => {},
    onError: () => {},
  },
  methods: {
    onPopupClose(obj) {
      this.props.onPopupClose({
        type: 'popup-close',
        currentTarget: {
          id: this.props.id,
          dataset: obj,
        },
      })
    },
    onInsuranceStatus(obj) {
      this.props.onInsuranceStatus({
        type: 'insurance-status',
        currentTarget: {
          id: this.props.id,
          dataset: { ...obj },
        },
      })
    },
    onSuccess(obj) {
      this.props.onSuccess({
        type: 'success',
        currentTarget: {
          id: this.props.id,
          dataset: { ...obj },
        },
      })
    },
    onClose(obj) {
      this.props.onClose({
        type: 'close',
        currentTarget: {
          id: this.props.id,
          dataset: { ...obj },
        },
      })
    },
    onError(obj) {
      this.props.onError({
        type: 'error',
        currentTarget: {
          id: this.props.id,
          dataset: { ...obj },
        },
      })
    },
  },
})
```

:::

然后在页面里引用这个组件。

::: code-group

```ts [page.config.ts]
export default definePageConfig({
  usingComponents: {
    'my-riding-risk-component-pop':
      '../../components/MyRidingRiskComponentPop/index',
  },
})
```

```tsx [page.tsx]
export default function Page() {
  const [visible, setVisible] = useState(false)
  const ridingRiskRtaExtMap = {}
  const ridingRiskSpaceCode = '该code为申请的spaceCode'

  const onPopRiding = () => {
    setVisible(true)
  }

  const onPopupClose = () => {
    setVisible(false)
  }

  const onInsuranceStatus = () => {
    console.log('用户完成了投保动作')
  }

  const onSuccess = () => {
    console.log('广告加载成功')
  }

  const onClose = () => {
    console.log('广告关闭')
  }

  const onError = () => {
    console.log('广告加载失败')
  }

  return (
    <Button onClick={onPopRiding}>保险弹窗</Button>
    <my-riding-risk-component-pop
      id="my-riding-risk-component-pop"
      visible={visible}
      onPopupClose={onPopupClose}
      onInsuranceStatus={onInsuranceStatus}
      spaceCode={ridingRiskSpaceCode}
      rtaExtMap={ridingRiskRtaExtMap}
      onSuccess={onSuccess}
      onClose={onClose}
      onError={onError}
    />
  )
}
```

:::

::: warning
`id` 一定要传，否则回调函数不会执行。
:::

### References

- [支付宝小程序领券插件回调函数报错，不执行](https://github.com/NervJS/taro/issues/12571)
- [Taro 使用原生模块](https://docs.taro.zone/docs/hybrid)
- [支付宝小程序自定义组件](https://opendocs.alipay.com/mini/framework/custom-component-overview?pathHash=dc169ba1)
