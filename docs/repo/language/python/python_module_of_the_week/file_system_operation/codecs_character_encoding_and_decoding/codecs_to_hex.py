import binascii


def to_hex(t: str, nbytes: int):
    """Format text t as a sequence of nbyte long values separated by spaces."""

    chars_per_item = nbytes * 2
    hex_version = binascii.hexlify(t)
    return b' '.join(hex_version[i:i + chars_per_item] for i in range(0, len(hex_version), chars_per_item))


if __name__ == '__main__':
    print(to_hex(b'abcdef', 1))
    print(to_hex(b'abcdef', 2))
