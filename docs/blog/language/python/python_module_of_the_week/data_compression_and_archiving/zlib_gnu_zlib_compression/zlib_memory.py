import binascii
import zlib


original_data = b'This is the original text.'
print(
    f'Original data length: {len(original_data)} {original_data}')

compressed_data = zlib.compress(original_data)
print(
    f'Compressed data length: {len(compressed_data)} {binascii.hexlify(compressed_data)}')

decompressed_data = zlib.decompress(compressed_data)
print(
    f'Decompressed data length: {len(decompressed_data)} {decompressed_data}')
