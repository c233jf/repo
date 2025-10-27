import shelve


with shelve.open('test_shelf.db') as db:
    existing = db['key1']

print(existing)
