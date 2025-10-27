import shelve


with shelve.open('test_shelf.db') as db:
    print(db['key1'])
    db['key1']['new_value'] = 'this is a new value'

with shelve.open('test_shelf.db', writeback=True) as db:
    print(db['key1'])
