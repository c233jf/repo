import dbm


with dbm.open('test.db', 'w') as db:
    try:
        db[1] = 'one'
    except TypeError as e:
        print(f'ERROR: {e}')
