import dbm
import shelve


with shelve.open('test_shelf.db', flag='r') as db:
    print('Existing:', db['key1'])
    try:
        db['key1'] = 'this is a test'
    except dbm.error as e:
        print(f'ERROR: {e}')
