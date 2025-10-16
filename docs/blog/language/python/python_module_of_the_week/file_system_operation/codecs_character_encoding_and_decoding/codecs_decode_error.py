import codecs
import sys

import codecs_to_hex


error_handling = sys.argv[1]

text = 'français'
print('Original     :', repr(text))

# 使用一个编码保存数据
with codecs.open('decode_error.txt', 'w', encoding='utf-16') as f:
    f.write(text)

# 转化文件中的字节
with open('decode_error.txt', 'rb') as f:
    print('File contents:', codecs_to_hex.to_hex(f.read(), 1))

# 尝试以错误的编码读取数据
with codecs.open('decode_error.txt', 'r', encoding='utf-8', errors=error_handling) as f:
    try:
        data = f.read()
    except UnicodeDecodeError as err:
        print('ERROR:', err)
    else:
        print('Read         :', repr(data))
