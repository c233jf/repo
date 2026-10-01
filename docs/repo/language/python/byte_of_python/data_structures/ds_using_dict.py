# 'ab' 是 'a'ddress'b'ook 的缩写，意思是地址簿

db = {
    'Swaroop': 'swaroop@swaroopch.com',
    'Larry': 'larry@wall.org',
    'Matsumoto': 'matz@ruby-lang.org',
    'Spammer': 'spammer@hotmail.com'
}

print('Swaroop\'s address is', db['Swaroop'])

# 删除一个键值对
del db['Spammer']
print('\nThere are {} contacts in the database.'.format(len(db)))

for name, address in db.items():
    print('Contact {} at {}'.format(name, address))

# 添加一个键值对
db['Guido'] = 'guido@python.org'

if 'Guido' in db:
    print("\nGuido's address is", db['Guido'])
