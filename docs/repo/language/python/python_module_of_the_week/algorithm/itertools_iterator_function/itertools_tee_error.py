import itertools


r = itertools.islice(itertools.count(), 5)
i1, i2 = itertools.tee(r)

print('r:', end=' ')
for i in r:
    print(i, end=' ')
    if i > 1:
        break
print()

print('i1:', list(i1))
print('i2:', list(i2))
