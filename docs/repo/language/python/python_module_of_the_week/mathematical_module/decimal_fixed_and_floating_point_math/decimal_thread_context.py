import decimal
import threading
from queue import PriorityQueue


class Multiplier(threading.Thread):

    def __init__(self, a: decimal.Decimal, b: decimal.Decimal, prec: int, q: PriorityQueue):
        self.a = a
        self.b = b
        self.prec = prec
        self.q = q
        threading.Thread.__init__(self)

    def run(self):
        c = decimal.getcontext().copy()
        c.prec = self.prec
        decimal.setcontext(c)
        self.q.put((self.prec, a * b))


a = decimal.Decimal('3.14')
b = decimal.Decimal('1.234')
# PriorityQueue 将返回按精度排序的值，
# 无论线程完成时是什么顺序。
q = PriorityQueue()
threads = [Multiplier(a, b, i, q) for i in range(1, 6)]
for t in threads:
    t.start()

for t in threads:
    t.join()

for i in range(5):
    prec, value = q.get()
    print('{}  {}'.format(prec, value))
