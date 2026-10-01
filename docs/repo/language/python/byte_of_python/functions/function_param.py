def print_max(a: int, b: int):
    if a > b:
        print(a, "is maximum")
    elif a == b:
        print(a, "is equal to", b)
    else:
        print(b, "is maximum")


# 直接传递字面值
print_max(3, 4)

x = 5
y = 7

# 通过变量传递值
print_max(x, y)
