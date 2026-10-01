import operator


a = 1
b = 5.0

print('a =', a)
print('b =', b)
for func in (operator.lt, operator.le, operator.eq, operator.ne, operator.ge, operator.gt):
    print(f'{func.__name__}(a, b) = {func(a, b)}')
