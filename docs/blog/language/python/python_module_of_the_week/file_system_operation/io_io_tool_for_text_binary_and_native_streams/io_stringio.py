import io


# 写入缓冲区
output = io.StringIO()
output.write('This goes into the buffer. ')
print('And so does this.', file=output)

# 得到写入的值
print(output.getvalue())

output.close()  # discard buffer memory


# 初始化一个读缓冲区
input = io.StringIO('Inital value for read buffer')

# 从缓冲区读
print(input.read())
