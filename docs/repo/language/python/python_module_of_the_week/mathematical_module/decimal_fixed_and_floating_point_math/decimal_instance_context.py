import decimal


# 设置精度有限的上下文
c = decimal.getcontext().copy()
c.prec = 3

# 创建我们的常数
pi = c.create_decimal('3.1415')

# 常数值四舍五入
print('PI    :', pi)

# 使用全局上下文常量的结果
print('RESULT:', decimal.Decimal('2.01') * pi)
