import array
import binascii
import ctypes
import struct


s = struct.Struct('I 2s f')
values = (1, 'ab'.encode('utf-8'), 2.7)
print('原始值:', values)

print()
print('使用了ctypes 模块的字符串缓冲区')

b = ctypes.create_string_buffer(s.size)
print('原始 buffer :', binascii.hexlify(b.raw))
s.pack_into(b, 0, *values)
print('打包结果写入 :', binascii.hexlify(b.raw))
print('解包 :', s.unpack_from(b, 0))

print()
print('使用了 array 模块')

a = array.array('b', b'\0' * s.size)
print('原始值 :', binascii.hexlify(a))
s.pack_into(a, 0, *values)
print('打包写入 :', binascii.hexlify(a))
print('解包 :', s.unpack_from(a, 0))
