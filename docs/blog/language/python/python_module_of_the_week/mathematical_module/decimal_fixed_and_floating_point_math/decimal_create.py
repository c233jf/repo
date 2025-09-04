import decimal


fmt = '{0:<25} {1:<25}'

print(fmt.format('Input', 'Output'))
print(fmt.format('-' * 25, '-' * 25))

# 整数
print(fmt.format(5, decimal.Decimal(5)))

# 字符串
print(fmt.format('3.14', decimal.Decimal('3.14')))

# 浮点数
f = 0.1
print(fmt.format(repr(f), decimal.Decimal(str(f))))
print('{:<0.23g} {:<25}'.format(
    f,
    str(decimal.Decimal.from_float(f))[:25])
)
