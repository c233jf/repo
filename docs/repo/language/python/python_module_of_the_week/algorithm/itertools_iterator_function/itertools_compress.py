import itertools


every_third = itertools.cycle([False, False, True])
data = range(1, 10)

for i in itertools.compress(data, every_third):
    print(i, end=' ')
print()
