import itertools
from typing import Iterable


def show(iterable: Iterable[int]):
    for i, item in enumerate(iterable, 1):
        print(item, end=' ')
        if (i % 3) == 0:
            print()
    print()


print('Repeat 2:\n')
show(list(itertools.product(range(3), repeat=2)))

print('Repeat 3:\n')
show(list(itertools.product(range(3), repeat=3)))
