import itertools


for i in map(lambda x, y: (x, y, x * y), itertools.repeat(2), range(5)):
    print('{:d} * {:d} = {:d}'.format(*i))
