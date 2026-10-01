import itertools


r = itertools.islice(itertools.count(), 5)
i1, i2 = itertools.tee(r)

print('i1:', list(i1))
print('i2:', list(i2))
