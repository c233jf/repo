import itertools


def should_take(x: int):
    print('Testing:', x)
    return x < 2


for i in itertools.takewhile(should_take, [-1, 0, 1, 2, -2]):
    print('Yielding:', i)
