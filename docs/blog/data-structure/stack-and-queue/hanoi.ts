let count = 0

function move(n: number, from: string, to: string) {
  console.log(++count, n, from, to)
}

function hanoi(n: number, from: string, auxiliary: string, to: string) {
  // 将塔座 A 上的 n 个圆盘按规则移到 C 上，B 做辅助塔
  if (n === 1) {
    move(n, from, to) // 将编号为 1 的圆盘从 A 移到 C
  } else {
    hanoi(n - 1, from, to, auxiliary) // 将 A 上 n - 1 个圆盘移到 B，C 做辅助塔
    move(n, from, to) // 将编号为 n 的圆盘从 A 移到 C
    hanoi(n - 1, auxiliary, from, to) // 将 B 上 n - 1 个圆盘移到 C，A 做辅助塔
  }
}

hanoi(4, 'A', 'B', 'C')
