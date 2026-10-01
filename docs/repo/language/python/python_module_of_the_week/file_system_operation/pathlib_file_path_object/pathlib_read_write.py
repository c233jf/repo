import pathlib


f = pathlib.Path('example.txt')
f.write_bytes('Hello, World!'.encode('utf-8'))

with f.open('r', encoding='utf-8') as handle:
    print('read from open(): {!r}'.format(handle.read()))

print('read_text(): {!r}'.format(f.read_text('utf-8')))
