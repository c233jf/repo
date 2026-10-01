# 用于计算 md5校验和 的数据
import hashlib
import time


data = open(__file__, 'rb').read()

for i in range(5):
    h = hashlib.sha1()
    print(time.ctime(), ': {:0.3f} {:0.3f}'.format(
        time.time(), time.clock()))
    for i in range(100000):
        h.update(data)
    cksum = h.digest()
