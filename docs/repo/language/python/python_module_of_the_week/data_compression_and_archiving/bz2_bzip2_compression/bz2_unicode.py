import bz2


data = 'Character with an åccent.'

with bz2.open('example.bz2', 'wt', encoding='utf-8') as f:
    f.write(data)

with bz2.open('example.bz2', 'rt', encoding='utf-8') as f:
    print(f'Full file: {f.read()}')


# 移动到重音字符前
with bz2.open('example.bz2', 'rt', encoding='utf-8') as f:
    f.seek(18)
    print(f'One character: {f.read(1)}')

# 移动到重音字符中间
with bz2.open('example.bz2', 'rt', encoding='utf-8') as f:
    f.seek(19)
    try:
        print(f.read(1))
    except UnicodeDecodeError as err:
        print('ERROR:', err)
