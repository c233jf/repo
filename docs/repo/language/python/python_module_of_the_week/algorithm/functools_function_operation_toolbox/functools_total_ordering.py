import functools
import inspect
import pprint


@functools.total_ordering
class MyObject:

    def __init__(self, value: int):
        self.value = value

    def __eq__(self, other: 'MyObject') -> bool:
        print(f'  testing __eq__({self.value}, {other.value})')
        return self.value == other.value

    def __gt__(self, other: 'MyObject') -> bool:
        print(f'  testing __gt__({self.value}, {other.value})')
        return self.value > other.value


print('Methods:\n')
pprint.pprint(inspect.getmembers(MyObject, inspect.isfunction))

a = MyObject(1)
b = MyObject(2)

print('\nComparisons:')
for expr in ['a < b', 'a <= b', 'a == b', 'a > b', 'a >= b']:
    print(f'\n{expr:<6}:')
    result = eval(expr)
    print(f'  result of {expr}: {result}')
