import collections


Person = collections.namedtuple('Person', 'name age')

bob = Person(name='Bob', age=30)
print('Original :', bob)

bob2 = bob._replace(age=25)
print('Updated :', bob2)

print('Same?:', bob is bob2)
