import io


# 写入一个缓冲区
output = io.BytesIO()
wrapper = io.TextIOWrapper(output, encoding='utf-8', write_through=True)
wrapper.write('This goes into the buffer. ')
wrapper.write('ÁÇÊ')

# 获取写入的值
print(output.getvalue())

output.close()  # discard buffer memory

# 初始化一个读缓冲区
input = io.BytesIO(
    b'Inital value for read buffer with unicode characters ' +
    'ÁÇÊ'.encode('utf-8')
)
wrapper = io.TextIOWrapper(input, encoding='utf-8')

# 读取缓冲池
print(wrapper.read())
