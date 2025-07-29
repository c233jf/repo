import collections
import threading
import time
from typing import Callable


candle = collections.deque(range(5))


def burn(direction: str, next_source: Callable[[], int]):
    while True:
        try:
            next = next_source()
        except IndexError:
            break
        else:
            print('{:>8}: {}'.format(direction, next))
            time.sleep(0.1)
    print('{:>8} done'.format(direction))
    return


left = threading.Thread(target=burn, args=('Left', candle.popleft))
right = threading.Thread(target=burn, args=('Right', candle.pop))
left.start()
right.start()
left.join()
right.join()
