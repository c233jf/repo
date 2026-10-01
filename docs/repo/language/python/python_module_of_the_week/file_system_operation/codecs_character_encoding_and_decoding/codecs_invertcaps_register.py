import codecs

import codecs_invertcaps_charmap


class InvertCapsCodec(codecs.Codec):
    "Stateless encoder/decoder"

    def encode(self, input: str, errors: str = 'strict'):
        return codecs.charmap_encode(input, errors, codecs_invertcaps_charmap.encoding_map)

    def decode(self, input: bytes, errors: str = 'strict'):
        return codecs.charmap_decode(input, errors, codecs_invertcaps_charmap.decoding_map)


class InvertCapsIncrementalEncoder(codecs.IncrementalEncoder):

    def encode(self, input: str, final: bool = False):
        data, _ = codecs.charmap_encode(
            input, self.errors, codecs_invertcaps_charmap.encoding_map)
        return data


class InvertCapsIncrementalDecoder(codecs.IncrementalDecoder):

    def decode(self, input: bytes, final: bool = False):
        data, _ = codecs.charmap_decode(
            input, self.errors, codecs_invertcaps_charmap.decoding_map)
        return data


class InvertCapsStreamReader(InvertCapsCodec,
                             codecs.StreamReader):
    pass


class InvertCapsStreamWriter(InvertCapsCodec,
                             codecs.StreamWriter):
    pass


def find_invertcaps(encoding: str):
    """Return the codec for 'invertcaps'."""

    if encoding == 'invertcaps':
        return codecs.CodecInfo(
            name='invertcaps',
            encode=InvertCapsCodec().encode,
            decode=InvertCapsCodec().decode,
            incrementalencoder=InvertCapsIncrementalEncoder,
            incrementaldecoder=InvertCapsIncrementalDecoder,
            streamreader=InvertCapsStreamReader,
            streamwriter=InvertCapsStreamWriter,
        )
    return None


codecs.register(find_invertcaps)

if __name__ == '__main__':
    # 无状态编解码器
    encoder = codecs.getencoder('invertcaps')
    text = 'abcDEF'
    encoded_text, consumed = encoder(text)
    print('Encoded "{}" to "{}", consuming {} characters'.format(
        text, encoded_text, consumed))

    # 流写入器
    import io

    buffer = io.BytesIO()
    writer = codecs.getwriter('invertcaps')(buffer)
    print('StreamWriter for io buffer: ')
    print('  writing "abcDEF"')
    writer.write('abcDEF')
    print('  buffer contents: ', buffer.getvalue())

    # 增量解码器
    decoder_factory = codecs.getincrementaldecoder('invertcaps')
    decoder = decoder_factory()
    decoded_text_parts: list[str] = []
    for c in encoded_text:
        decoded_text_parts.append(
            decoder.decode(bytes([c]), final=False)
        )
    decoded_text_parts.append(decoder.decode(b'', final=True))
    decoded_text = ''.join(decoded_text_parts)
    print('IncrementalDecoder converted {!r} to {!r}'.format(
        encoded_text, decoded_text))
