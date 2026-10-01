import codecs
import sys


error_handling = sys.argv[1]

text = 'français'

try:
    # 保存数据，编码为 ASCII，使用命令行中声明的错误处理模式
    with codecs.open('encode_error.txt', 'w', encoding='ascii', errors=error_handling) as f:
        f.write(text)
except UnicodeEncodeError as err:
    print('ERROR:', err)
else:
    # 如果写入文件的时候没有错误，显示文件内容
    with open('encode_error.txt', 'rb') as f:
        print('File contents: {!r}'.format(f.read()))
