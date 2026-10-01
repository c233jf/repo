from operator import *


class MyObj:
    """example class for attrgetter"""

    def __init__(self, arg):
        super().__init__()
        self.arg = arg

    def __repr__(self):
        return 'MyObj({})'.format(self.arg)


l = [MyObj(i) for i in range(5)]
print('objects   :', l)

# 从每个对象中提取 'arg' 值
g = attrgetter('arg')
vals = [g(i) for i in l]
print('arg values:', vals)

# 使用 arg 排序
l.reverse()
print('reversed  :', l)
print('sorted    :', sorted(l, key=g))
