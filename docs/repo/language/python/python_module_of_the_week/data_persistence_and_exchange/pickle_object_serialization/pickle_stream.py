import io
import pickle


class SimpleObject:

    def __init__(self, name: str):
        self.name = name
        self.name_backwards = name[::-1]


data: list[SimpleObject] = []
data.append(SimpleObject('pickle'))
data.append(SimpleObject('cPickle'))
data.append(SimpleObject('last'))

# 模拟一个文件
out_s = io.BytesIO()

# 写入流中
for o in data:
    print(f'WRITING: {o.name} ({o.name_backwards})')
    pickle.dump(o, out_s)
    out_s.flush()

# 设置一个可读取的流
in_s = io.BytesIO(out_s.getvalue())

# 读取数据
while True:
    try:
        o: SimpleObject = pickle.load(in_s)
    except EOFError:
        break
    else:
        print(f'READ: {o.name} ({o.name_backwards})')
