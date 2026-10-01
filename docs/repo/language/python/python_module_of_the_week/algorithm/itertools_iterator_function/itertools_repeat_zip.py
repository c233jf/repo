import itertools


for i, s in zip(itertools.count(), itertools.repeat('over-and-over', 5)):
    print(i, s)
