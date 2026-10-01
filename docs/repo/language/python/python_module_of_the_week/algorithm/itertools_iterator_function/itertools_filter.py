def check_item(x: int):
    print('Testing:', x)
    return x < 1


for i in filter(check_item, [-1, 0, 1, 2, -2]):
    print('Yielding:', i)
