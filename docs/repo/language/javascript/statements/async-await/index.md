# Async / Await

Async / Await 是以更舒适、简洁的方式使用 Promise 的一种语法，同时它也非常易于理解和使用，因为它使用起来就像编写同步函数一样，同时避免显式配置 Promise 链。

## async function

### 语法

```js
async function name(param0, param1, /* …, */ paramN) {
  statements
}
```

`async function` 总是返回一个 Promise。如果函数返回的值不是 Promise，则返回值会被自动包装到 resolved 的 Promise 中；如果函数抛出异常，则异常会被自动包装到 rejected 的 Promise 中。

### 示例

```js
async function func() {
  return 1
}

func().then((result) => {
  console.log(result)
})
```

```js
async function func() {
  return Promise.resolve(1)
}

func().then((result) => {
  console.log(result)
})
```

以上两段代码的结果是一样的。

::: warning

```js
async function func() {
  return 1
}
```

```js
function func() {
  return Promise.resolve(1)
}
```

以上两段代码执行结果是类似的，但并不是等价的。

```js
const p = new Promise((resolve, reject) => {
  resolve(1)
})

async function asyncReturn() {
  return p
}

function basicReturn() {
  return Promise.resolve(p)
}

console.log(p === basicReturn()) // true
console.log(p === asyncReturn()) // false
```

如果返回的值是一个 Promise 对象，`async function` 会返回一个不同的引用，而 `Promise.resolve` 会返回相同的引用。

当你想要检查一个 Promise 和一个 `async function` 的返回值是否等价时，这可能是一个麻烦。
:::

## await

### 语法

```js
async function func() {
  await promise
}
```

`await` 一般只能在 `async function` 内使用，在 `async function` 之外使用会报 `SyntaxError`。

::: tip
例外，在现代浏览器中，我们可以在 JS 模块使用顶层 `await`。

```js
// 假设以下代码在模块的顶层运行。
const res = await fetch('...')
```

如果要兼容旧的浏览器，我们还可以将其包装到匿名异步函数中：

```js
;(async () => {
  const res = await fetch('...')
})()
```

:::

`await` 会暂停函数的执行，直到 `promise` 被 `resolve` 或 `reject`。`promise` 的 `resolve` 值会作为 `await` 表达式的返回值，而 `promise` 在 `reject` 的情况下，`await` 将其作为异常抛出，可以使用 `try / catch` 语句处理异常。

### 示例

```js
async function func() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('done')
    }, 1000)
  })

  console.log(await promise)
}

func() // 1s 后输出 done。
```

### 注意

在异步函数中，从顶层代码到第一个 `await` 表达式都是同步运行的。因此，不包含 `await` 表达式的异步函数是同步运行的，此时异步函数与同步函数在执行过程上没有区别，因为它们的函数体所有代码都是同步运行，区别在于异步函数总是返回 Promise。

如果你在一个函数中调用没有 `await` 表达式的异步函数并且不使用 `await` 去等待它的话，就跟执行了一个同步函数一样没有区别。

```js
async function func() {
  console.log('no await')
}

function sync() {
  func()
  console.log('sync')
}

sync() // no await, sync
```

然而，如果函数体内有 `await` 表达式，则在第一个 `await` 表达式之后的语句的执行一定是异步的。

<<< ./example-1.ts

每个 `await` 表达式之后的代码可以被认为存在于 `then` 回调中。

例如：

```js
async function foo() {
  await 1
}
```

等价于：

```js
function foo() {
  return Promise.resolve(1).then(() => undefined)
}
```

通过这种方式，可以通过函数的每个可重入步骤来逐步构建 Promise 链。而返回值构成了链中的最后一个环。

例如：

```js
async function foo() {
  const result1 = await new Promise((resolve) => setTimeout(() => resolve('1')))
  const result2 = await new Promise((resolve) => setTimeout(() => resolve('2')))
}
foo()
```

`foo()` 的执行分为三个阶段：

1. 第一行会同步执行，设置了一个待 settled 的 Promise。然后 `foo()` 的执行将被暂停，并将控制权交还给调用 `foo()` 的函数；
2. 一段时间后，当第一个 Promise 被 `resolve()` 的时候，控制权将重新回到 `foo()` 内。第一个 Promise 的 `resolve()` 值将作为 `await` 表达式的返回值。在这里 '1' 被赋值给 `result1`。程序继续执行，并计算第二个 `await` 表达式。同样的，`foo()` 的执行将被暂停，并交出控制权；
3. 一段时间后，当第二个 Promise 被 `resolve()` 的时候，控制权将重新回到 `foo()` 内。第二个 Promise 的 `resolve()` 值将作为 `await` 表达式的返回值。在这里 '2' 被赋值给 `result2`。程序继续执行。默认的返回值 `undefined` 作为当前异步函数的 `Promise.resolve()` 值。

## 异常处理

如上所述，我们可以使用 `try / catch` 语句处理异步函数的异常。

```js
async function func() {
  try {
    const res = await fetch('...')
  } catch (err) {
    console.log(err)
  }
}
```

我们可以使用以下两种方式抛出异常：

```js
async function func() {
  return Promise.reject(new Error('...'))
}

async function func1() {
  throw new Error('...')
}
```

这两种方式是等价的。

就像我们一开始讲述的那样，异步函数抛出异常的时候，会自动把异常包装到 rejected 的 Promise 中，所以除了 `try / catch` 语句，我们还可以使用 `promise.catch` 进行处理。

```js
async function func() {
  return Promise.reject(new Error('...'))
}

func().catch(...)
```

::: tip
当我们使用 `async function` 时，通常会使用 `await` 替代 `then`，使用 `try / catch` 替代 `promise.catch`，因为这样做通常编写代码会更加简洁方便可读易懂。

但是当我们在代码顶层编写异步代码时（非模块），我们就不能使用 `await` 了（会报 `SyntaxError`，除非使用包装函数），这时候更通畅的做法是使用 `then / catch`。
:::

::: tip
`async / await` 可以与 `Promise.all` 配合使用。

```js
async function func() {
  const res = await Promise.all([fetch(url1), fetch(url2), ...])
}
```

:::

### 注意

我们从 [await 的注意事项](#注意)中可知，`async / await` 实际上在构建一个 Promise 链。但实际上，Promise 链不是一次性构建好的。而是随着控制权依次在异步函数中交出并返回而分阶段构建的。这在进行异步函数的错误处理时会有一些问题。

```js
async function foo() {
  const p1 = new Promise((resolve) => setTimeout(() => resolve('1'), 1000))
  const p2 = new Promise((_, reject) => setTimeout(() => reject('2'), 500))
  const results = [await p1, await p2] // 不要这么写！请使用 Promise.all 或者 Promise.allSettled。
}
foo().catch(() => {}) // 尝试捕捉所有的错误...
```

运行以上的代码，你会发现即使使用了 `catch` 去捕捉错误，还是会抛出一个未处理的 Promise rejected 错误。这是因为 `p2` 需要等待 `p1` 返回后才会连接到 Promise 链中，而这里 `p2` 执行的比 `p1` 快，导致 `p2` reject 的时候，`p1` 还没返回。

## 异步函数和执行顺序

<<< ./example-2.ts

在 `sequentialStart()` 中，程序执行第一个 `await` 时暂停 2 秒，然后又为第二个 `await` 暂停了 1 秒。直到第一个计时器结束后，第二个计时器才被创建，因此程序需要 3 秒执行完毕。

在 `sequentialWait()` 中，两个计时器都被创建并用 `await` 进行等待。这两个计时器并行运行，这意味着代码运行时间缩短到 2 秒，而不是 3 秒，即较慢的计时器的时间。然而，`await` 调用仍旧是顺序执行的，这意味着第二个 `await` 会等待第一个执行完。在这个例子中，较快的计时器的结果会在较慢的计时器之后被处理。

在两个 `concurrent` 中，两个计时器被同时创建，然后执行 `await`。这两个计时器同时运行，这意味着程序完成运行只需要 2 秒，而不是 3 秒，即较慢的计时器的时间。

如果你希望在并发执行的多个任务完成后安全地执行其他任务，那么在这些任务开始前，你必须等待对 [Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 或 [Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 的调用。

::: danger
`sequentialWait()` 和 `concurrent1()` 并非是等价的。

就像我们[这里](#注意-1)提及的一样，在 `sequentialWait()` 中，如果较快的 Promise 先于较慢的 Promise resolve 前 reject，则会出现未处理的 Promise rejected error，无论调用者是否配置了 catch 子句。

而在 `concurrent1()` 中，`Promise.all` 一次性将 Promise 链连接起来，只要其中有一个 reject，无论 Promise 的顺序如何，都会立即抛出错误，如果设置了 catch 子句 或使用 `try / catch`，则会被其捕获。
:::

## References

- [async-await](https://zh.javascript.info/async-await)
- [async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
