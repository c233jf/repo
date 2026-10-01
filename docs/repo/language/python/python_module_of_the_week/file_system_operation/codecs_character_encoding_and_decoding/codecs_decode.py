import codecs_to_hex


text = 'français'
encoded = text.encode('utf-8')
decoded = encoded.decode('utf-8')

print('Original :', repr(text))
print('Encoded  :', codecs_to_hex.to_hex(encoded, 1), type(encoded))
print('Decoded  :', repr(decoded), type(decoded))
