import socketserver


class Echo(socketserver.BaseRequestHandler):

    def handle(self):
        # 接收字节并送回客户端
        data = self.request.recv(1024)
        self.request.send(data)
        return


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

    # 发送数据
    # 错误：没有进行编码！
    text = 'français'
    len_sent = s.send(text)

    # 接收一个响应
    response = s.recv(len_sent)
    print(repr(response))

    # 清场
    s.close()
    server.socket.close()
