import binascii
import logging
import socketserver
import zlib


BLOCK_SIZE = 64


class ZlibRequestHandler(socketserver.BaseRequestHandler):
    logger = logging.getLogger('Server')

    def handle(self):
        compressor = zlib.compressobj(1)

        # 找出客户想要的文件
        filename = self.request.recv(1024).decode('utf-8')
        self.logger.debug(f'Client requested file: {filename}')

        # 在压缩文件时发送文件块
        with open(filename, 'rb') as f:
            while True:
                block = f.read(BLOCK_SIZE)
                if not block:
                    break
                self.logger.debug('RAW %r', block)
                compressed = compressor.compress(block)
                if compressed:
                    self.logger.debug('SENDING %r',
                                      binascii.hexlify(compressed))
                    self.request.send(compressed)
                else:
                    self.logger.debug('BUFFERING')

        # 发送由压缩器缓冲的任何数据
        remaining = compressor.flush()
        while remaining:
            to_send = remaining[:BLOCK_SIZE]
            remaining = remaining[BLOCK_SIZE:]
            self.logger.debug('FLUSHING %r', binascii.hexlify(to_send))
            self.request.send(to_send)
        return


if __name__ == '__main__':
    import socket
    import threading
    from io import BytesIO

    logging.basicConfig(
        level=logging.DEBUG,
        format='%(name)s: %(message)s',
    )
    logger = logging.getLogger('Client')

    # 设置服务器，在单独的线程中运行
    address = ('localhost', 0)  # 让内核分配一个端口
    server = socketserver.TCPServer(address, ZlibRequestHandler)
    ip, port = server.server_address  # 分配了什么端口？

    t = threading.Thread(target=server.serve_forever)
    t.daemon = True  # 设置为守护进程
    t.start()

    # 作为客户端连接到服务器
    logger.info('Contacting server on %s:%s', ip, port)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip, port))

    # 索取文件
    filename = 'lorem.txt'
    logger.debug('Requesting %s', filename)
    len_sent = s.send(filename.encode('utf-8'))

    # 接受应答
    buffer = BytesIO()
    decompressor = zlib.decompressobj()
    while True:
        response = s.recv(BLOCK_SIZE)
        if not response:
            break
        logger.debug('READ %r', binascii.hexlify(response))

        # 在解压器中包含任何未使用的数据。
        to_decompress = decompressor.unconsumed_tail + response
        while to_decompress:
            decompressed = decompressor.decompress(to_decompress)
            if decompressed:
                logger.debug('DECOMPRESSED %r', decompressed)
                buffer.write(decompressed)
                # 由于缓冲区溢出，查找未使用的数据
                to_decompress = decompressor.unconsumed_tail
            else:
                logger.debug('BUFFERING')
                to_decompress = None

    # 处理解压缩缓冲区内剩余的数据
    remaining = decompressor.flush()
    if remaining:
        logger.debug('FLUSHING %r', remaining)
        buffer.write(remaining)

    full_response = buffer.getvalue()
    lorem = open('lorem.txt', 'rb').read()
    logger.debug('response matches file contents: %s', full_response == lorem)

    # 清理
    s.close()
    server.socket.close()
