import bisect


# 一些随机数
values = [14, 85, 77, 26, 50, 45, 66, 79, 10, 3, 84, 77, 1]

print('New  Pos  Contents')
print('---  ---  --------')

l = []
for i in values:
    pos = bisect.bisect_left(l, i)
    bisect.insort_left(l, i)
    print(f'{i:3d}  {pos:3d}  {l}')
