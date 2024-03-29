# 归并排序

**归并排序**（Merging Sort）就是将两个或两个以上的有序表合并成一个有序表的过程。将两个有序表合并成一个有序表的过程称为 **2-路归并**，2-路归并最为简单和常用。

归并排序算法的思想：

假设初始序列含有 $n$ 个记录，则可看成是 $n$ 个有序的子序列，每个子序列的长度为 1，然后两两归并，得到 $\lceil \frac{n}{2} \rceil$ 个长度为 2 或 1 的有序子序列；再两两归并，......，如此重复，直到得到一个长度为 $n$ 的有序序列为止。

2-路归并排序中的核心操作是，将待排序序列中前后相邻的两个有序序列归并为一个有序序列，其算法类似于[有序表的合并](../../linear-list/examples/index.md#有序表的合并)。

## 相邻两个有序子序列的归并

算法步骤：

设两个有序表存放在同一数组中相邻的位置上：$R[low..mid]$ 和 $R[mid+1..high]$，每次分别从两个表中取出一个记录进行关键字的比较，将较小者放入 $T[low..high]$ 中，重复此过程，直至其中一个表为空，最后将另一非空表中余下的部分直接复制到 $T$ 中。

算法如下：

<<< ./merge-sort.ts#merge

假设每个子序列的长度为 $h$，则一趟归并排序需调用 $\lceil \frac{n}{2h} \rceil$ 次算法 `merge()` 进行两两归并，得到前后相邻、长度为 $2h$ 的有序段，整个归并排序需进行 $\lceil \log_2n \rceil$ 趟。

与快速排序类似，2-路归并排序也可以利用划分为子序列的方法递归实现。首先把整个待排序序列划分为两个长度大致相等的子序列，对这两个子序列分别递归地进行排序，然后再把它们归并。

## 归并排序的实现

算法步骤：

2-路归并排序将 $R[low..high]$ 中的记录归并排序后放入 $T[low..high]$ 中。当序列长度等于 1 时，递归结束，否则：

1. 将当前序列一分为二，求出分裂点 $mid=\lfloor \frac{low+high}{2} \rfloor$；
2. 对子序列 $R[low..mid]$ 递归，进行归并排序，结果放入 $S[low..mid]$ 中；
3. 对子序列 $R[mid+1..high]$ 递归，进行归并排序，结果放入 $S[mid+1..high]$ 中；
4. 调用算法 `merge()`，将有序的两个子序列 $S[low..mid]$ 和 $S[mid+1..high]$ 归并为一个有序序列 $T[low..high]$。

算法如下：

<<< ./merge-sort.ts#mergeSort

### 时间复杂度

当有 $n$ 个记录时，需进行 $\lceil \log_2n \rceil$ 趟归并排序，每一趟归并，其关键字比较次数不超过 $n$，元素移动次数都是 $n$，因此，归并排序的时间复杂度为 $O(n\log_2n)$。

### 空间复杂度

用顺序表实现归并排序时，需要和待排序记录个数相等的辅助存储空间，所以空间复杂度为 $O(n)$。

### 特点

- 排序结果稳定；
- 可用于链式结构，且不需要附加存储空间，但递归实现时仍需要开辟相应的递归工作栈。
