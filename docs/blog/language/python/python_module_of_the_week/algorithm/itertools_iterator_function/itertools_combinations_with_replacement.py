import itertools
from typing import Iterable, Optional


def show(iterable: Iterable[tuple[str, ...]]):
    first: Optional[str] = None
    for i, item in enumerate(iterable, 1):
        if first != item[0]:
            if first is not None:
                print()
            first = item[0]
        print(''.join(item), end=' ')
    print()


print('Unique pairs:\n')
show(itertools.combinations_with_replacement('abcd', r=2))
