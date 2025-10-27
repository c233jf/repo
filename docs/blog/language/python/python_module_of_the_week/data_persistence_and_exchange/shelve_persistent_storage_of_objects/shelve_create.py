import shelve


with shelve.open('test_shelf.db') as db:
    db['key1'] = {
        'int': 10,
        'float': 1.23,
        'string': 'hello',
        'boolean': True,
    }
