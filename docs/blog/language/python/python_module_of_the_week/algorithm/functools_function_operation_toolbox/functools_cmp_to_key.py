import functools


class MyObject:

    def __init__(self, val: int):
        self.val = val

    def __str__(self):
        return f'MyObject({self.val})'


def compare_obj(a: MyObject, b: MyObject):
    """比较两个对象"""
    print(f'comparing {a} and {b}')
    if a.val < b.val:
        return -1
    elif a.val > b.val:
        return 1
    return 0


# 使用 cmp_to_key() 转换为一个返回 key 的函数
get_key = functools.cmp_to_key(compare_obj)


def get_key_wrapper(obj: MyObject):
    """这个函数用于打印 get_key 的一些信息。"""
    new_key = get_key(obj)
    print(f'key_wrapper({obj}) -> {new_key!r}')
    return new_key


objs = [MyObject(val) for val in range(5, 0, -1)]

for o in sorted(objs, key=get_key_wrapper):
    print(o)
