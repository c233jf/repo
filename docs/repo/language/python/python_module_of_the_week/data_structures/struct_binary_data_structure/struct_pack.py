import binascii
import struct


values = (1, 'ab'.encode('utf-8'), 2.7)
s = struct.Struct('I 2s f')
packed_data = s.pack(*values)


print('原始值:', values)
print('格式符:', s.format)
print('占用字节:', s.size, 'bytes')
print('打包结果:', binascii.hexlify(packed_data))
