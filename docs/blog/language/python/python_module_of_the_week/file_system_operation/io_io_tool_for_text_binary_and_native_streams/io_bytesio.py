import io


# 写入一个缓冲区
output = io.BytesIO()
output.write('This goes into the buffer. '.encode('utf-8'))
output.write('ÁÇÊ'.encode('utf-8'))

# 获取写入的值
print(output.getvalue())

output.close()  # discard buffer memory

# 初始化一个读缓冲区
input = io.BytesIO(b'Inital value for read buffer')

# 从缓冲区读
print(input.read())
