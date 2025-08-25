import itertools


for i in itertools.chain([1, 2, 3], ['a', 'b', 'c']):
    print(i, end=' ')
print()
