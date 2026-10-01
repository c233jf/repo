import codecs

import codecs_to_hex


# 查看原生数据
with open('nonnative-encoded.txt', mode='rb') as f:
    raw_bytes = f.read()

print('Raw    :', codecs_to_hex.to_hex(raw_bytes, 2))

# 重新打开文件，并且让 codecs 检测 BOM
with codecs.open('nonnative-encoded.txt', mode='rb', encoding='utf-16') as f:
    decoded_text = f.read()

print('Decoded:', repr(decoded_text))
