import itertools


for i in zip(range(7), itertools.cycle(['a', 'b', 'c'])):
    print(i)
