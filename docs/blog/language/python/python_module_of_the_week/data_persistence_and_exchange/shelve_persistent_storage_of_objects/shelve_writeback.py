import pprint
import shelve


with shelve.open('test_shelf.db', writeback=True) as db:
    print('Initial data:')
    pprint.pprint(db['key1'])

    db['key1']['new_value'] = 'this is a new value'
    print('\nUpdated data:')
    pprint.pprint(db['key1'])

with shelve.open('test_shelf.db', writeback=True) as db:
    print('\nPreserved:')
    pprint.pprint(db['key1'])
