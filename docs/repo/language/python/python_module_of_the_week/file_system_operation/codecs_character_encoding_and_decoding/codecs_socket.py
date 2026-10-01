from io import BufferedReader
import socketserver


class Echo(socketserver.BaseRequestHandler):

    def handle(self):
        """Get some bytes and echo them back to the client.

        There is no need to decode them, since they are not used.
        """
        data = self.request.recv(1024)
        self.request.send(data)


class PassThrough:

    def __init__(self, other: BufferedReader):
        self.other = other

    def write(self, data: bytes):
        print('Writing :', repr(data))
        return self.other.write(data)

    def read(self, size: int = -1):
        print('Reading :', end=' ')
        data = self.other.read(size)
        print(repr(data))
        return data

    def flush(self):
        return self.other.flush()

    def close(self):
        return self.other.close()


if __name__ == '__main__':
    import codecs
    import socket
    import threading

    address = ('localhost', 0)  # 向内核申请一个端口
    server = socketserver.TCPServer(address, Echo)
    ip, port = server.server_address  # 获取分配的 IP 和端口

    t = threading.Thread(target=server.serve_forever)
    t.daemon = True  # 设置为守护进程
    t.start()

    # 连接到服务器
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip, port))

    # 使用读取器和写入器包装套接字
    read_file = s.makefile('rb')
    incoming = codecs.getreader('utf-8')(PassThrough(read_file))
    write_file = s.makefile('wb')
    outgoing = codecs.getwriter('utf-8')(PassThrough(write_file))

    # 发送数据
    text = 'français'
    print('Sending :', repr(text))
    outgoing.write(text)
    outgoing.flush()

    # 接收数据
    response = incoming.read()
    print('Received:', repr(response))

    # 清场
    s.close()
    server.socket.close()
