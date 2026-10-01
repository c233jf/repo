import binascii
import bz2


original_data = b'This is the original text.'
print(f'Original : {len(original_data)} bytes')
print(original_data)

print()
compressed_data = bz2.compress(original_data)
print(f'Compressed : {len(compressed_data)} bytes')
hex_version = binascii.hexlify(compressed_data)
for i in range(len(hex_version) // 40 + 1):
    print(hex_version[i * 40:(i + 1) * 40])

print()
decompressed_data = bz2.decompress(compressed_data)
print(f'Decompressed : {len(decompressed_data)} bytes')
print(decompressed_data)
