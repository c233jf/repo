import gzip


with gzip.open('example.txt.gz', 'rb') as f:
    print('Entire file:')
    all_data = f.read()
    print(all_data)

    expected = all_data[5:15]

    # 回到开头
    f.seek(0)

    # 向前移动 5 个字节
    f.seek(5)
    print('Starting at position 5 for 10 bytes:')
    partial = f.read(10)
    print(partial)

    print()
    print(expected == partial)
