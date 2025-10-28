import dbm


with dbm.open('test.db', 'w') as db:
    try:
        db['one'] = 1
    except TypeError as e:
        print(f'ERROR: {e}')
