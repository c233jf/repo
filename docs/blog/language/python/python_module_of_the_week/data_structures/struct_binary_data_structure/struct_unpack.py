import binascii
import struct


packed_data = binascii.unhexlify(b'0100000061620000cdcc2c40')

s = struct.Struct('I 2s f')
unpacked_data = s.unpack(packed_data)
print('解包结果', unpacked_data)
