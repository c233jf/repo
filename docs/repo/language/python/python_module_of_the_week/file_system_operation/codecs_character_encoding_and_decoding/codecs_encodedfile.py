import codecs
import io

import codecs_to_hex


# 原始数据
data = 'français'

# 手动编码为 UTF-8
utf8 = data.encode('utf-8')
print('Start as UTF-8   :', codecs_to_hex.to_hex(utf8, 1))

# 设置输出缓冲池，并将它包装为 EncodedFile
output = io.BytesIO()
encoded_file = codecs.EncodedFile(
    output, data_encoding='utf-8', file_encoding='utf-16')
encoded_file.write(utf8)

# 获取缓冲内容，并编码为 UTF-16
utf16 = output.getvalue()
print('Encoded to UTF-16:', codecs_to_hex.to_hex(utf16, 2))

# 使用 UTF-16 数据设置另一个缓冲池
# 并且包装为另一个 EncodedFile
buffer = io.BytesIO(utf16)
encoded_file = codecs.EncodedFile(
    buffer, data_encoding='utf-8', file_encoding='utf-16')

# 读取数据的 UTF-8 版本
recoded = encoded_file.read()
print('Back to UTF-8    :', codecs_to_hex.to_hex(recoded, 1))
