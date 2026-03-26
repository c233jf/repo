import binascii
import bz2
import logging
import socketserver


BLOCK_SIZE = 32


class Bz2RequestHandler(socketserver.BaseRequestHandler):
    logger = logging.getLogger('Server')

    def handle(self):
        compressor = bz2.BZ2Compressor()

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
                    self.logger.debug(
                        'SENDING %r', binascii.hexlify(compressed))
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
    from io import StringIO

    logging.basicConfig(
        level=logging.DEBUG,
        format='%(name)s: %(message)s',
    )

    # 设置服务器，在单独的线程中运行
    address = ('localhost', 0)  # 让内核分配一个端口
    server = socketserver.TCPServer(address, Bz2RequestHandler)
    ip, port = server.server_address  # 分配了什么端口？

    t = threading.Thread(target=server.serve_forever)
    t.daemon = True  # 设置为守护进程
    t.start()

    logger = logging.getLogger('Client')

    # 作为客户端连接到服务器
    logger.info('Contacting server on %s:%s', ip, port)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip, port))

    # 索取文件
    filename = 'lorem.txt'
    logger.debug('Requesting %s', filename)
    len_sent = s.send(filename.encode('utf-8'))

    # 接受应答
    buffer = StringIO()
    decompressor = bz2.BZ2Decompressor()
    while True:
        response = s.recv(BLOCK_SIZE)
        if not response:
            break
        logger.debug('READ %r', binascii.hexlify(response))

        # 在解压器中包含任何未使用的数据。
        decompressed = decompressor.decompress(response)
        if decompressed:
            logger.debug('DECOMPRESSED %r', decompressed)
            buffer.write(decompressed.decode('utf-8'))
        else:
            logger.debug('BUFFERING')

    full_response = buffer.getvalue()
    lorem = open(filename, 'rt').read()
    logger.debug('response matches file contents: %s', full_response == lorem)

    # 清理
    server.shutdown()
    server.socket.close()
    s.close()
