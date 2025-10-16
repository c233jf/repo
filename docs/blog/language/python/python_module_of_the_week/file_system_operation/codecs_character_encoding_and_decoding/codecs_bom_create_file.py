import codecs

import codecs_to_hex


# 选择 UTF-16 编码的非本地编码
if codecs.BOM_UTF16 == codecs.BOM_UTF16_BE:
    bom = codecs.BOM_UTF16_LE
    encoding = 'utf_16_le'
else:
    bom = codecs.BOM_UTF16_BE
    encoding = 'utf_16_be'

print('Native order  :', codecs_to_hex.to_hex(codecs.BOM_UTF16, 2))
print('Selected order:', codecs_to_hex.to_hex(bom, 2))

# 编码数据
encoded_text = 'français'.encode(encoding)
print('{:14}: {}'.format(encoding, codecs_to_hex.to_hex(encoded_text, 2)))

with open('nonnative-encoded.txt', mode='wb') as f:
    # 写入字节顺序标记，它没有包含在编码文本中
    # ，因为选择编码的时候字节顺序被显示给定了。
    f.write(bom)
    # 写入编码文本的字节字符串
    f.write(encoded_text)
