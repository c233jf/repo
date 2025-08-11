import array


a = array.array('i', range(3))
print('Initial :', a)

a.extend(range(3))
print('Extended:', a)

print('Slice :', a[1:4])

print('Iterator:')
print(list(enumerate(a)))
