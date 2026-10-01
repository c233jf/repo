import itertools


def f(a, b):
    print(a, b)
    return b + a + b


print(list(itertools.accumulate('abcde', f)))
