import codecs
import sys

import codecs_to_hex


encoding = sys.argv[1]
filename = encoding + '.txt'

print('Writing to', filename)
with codecs.open(filename, mode='w', encoding=encoding) as f:
    f.write('français')

# 定义用于 to_hex() 的字节分组
nbytes = {
    'utf-8': 1,
    'utf-16': 2,
    'utf-32': 4,
}.get(encoding, 1)

# 显示文件原生字节
print('File contents:')
with open(filename, mode='rb') as f:
    print(codecs_to_hex.to_hex(f.read(), nbytes))
