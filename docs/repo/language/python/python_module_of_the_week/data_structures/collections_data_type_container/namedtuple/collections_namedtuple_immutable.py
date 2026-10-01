import collections


Person = collections.namedtuple('Person', 'name age')

pat = Person(name='Pat', age=10)
print('\nRepresentation:', pat)

pat.age = 21
