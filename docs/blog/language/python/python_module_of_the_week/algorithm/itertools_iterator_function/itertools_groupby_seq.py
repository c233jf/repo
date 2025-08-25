import functools
import itertools
import operator
import pprint


@functools.total_ordering
class Point:

    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __repr__(self):
        return '({}, {})'.format(self.x, self.y)

    def __eq__(self, other: 'Point'):
        return (self.x, self.y) == (other.x, other.y)

    def __gt__(self, other: 'Point'):
        return (self.x, self.y) > (other.x, other.y)


# 为 Point 实例创建一个数据集
data = list(map(Point, itertools.cycle(itertools.islice(
    itertools.count(), 3)), itertools.islice(itertools.count(), 7)))
print('Data:')
pprint.pprint(data, width=35)
print()

# 将未排序的数据按X值分组
print('Grouped, unsorted:')
for k, g in itertools.groupby(data, operator.attrgetter('x')):
    print(k, list(g))
print()

# 对数据进行排序
data.sort()
print('Sorted:')
pprint.pprint(data, width=35)
print()

# 将数据按X值排序后分组
print('Grouped, sorted:')
for k, g in itertools.groupby(data, operator.attrgetter('x')):
    print(k, list(g))
print()
