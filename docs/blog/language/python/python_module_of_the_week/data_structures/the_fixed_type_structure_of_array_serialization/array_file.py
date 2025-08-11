import array
import binascii
import tempfile


a = array.array('i', range(5))
print('A1:', a)

# 将数字数组写入临时文件
output = tempfile.NamedTemporaryFile()
a.tofile(output.file)  # 必须传递一个 *真正的* 文件
output.flush()

# 读取原始数据
with open(output.name, 'rb') as input:
    raw_data = input.read()
    print('Raw Contents:', binascii.hexlify(raw_data))

    # 将数据读取到一个数组中
    input.seek(0)
    a2 = array.array('i')
    a2.fromfile(input, len(a))
    print('A2:', a2)
