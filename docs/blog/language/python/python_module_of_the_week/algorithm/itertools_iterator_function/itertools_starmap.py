import itertools


values = [(0, 5), (1, 6), (2, 7), (3, 8), (4, 9)]

for i in itertools.starmap(lambda x, y: (x, y, x * y), values):
    print('{} * {} = {}'.format(*i))
