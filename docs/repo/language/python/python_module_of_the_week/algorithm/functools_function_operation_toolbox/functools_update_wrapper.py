import functools
from typing import Callable


def myfunc(a: str, b: int = 2):
    """myfunc() 的文档字符串"""
    print('  调用 myfunc 的参数：', (a, b))


def show_details(name: str, f: Callable):
    """显示一个可调用对象的细节"""
    print(f'{name}:')
    print('  对象：', f)
    print('  __name__:', end=' ')
    try:
        print(f.__name__)
    except AttributeError:
        print('(no __name__)')
    print('  __doc__', repr(f.__doc__))
    print()


show_details('myfunc', myfunc)

p1 = functools.partial(myfunc, b=4)
show_details('raw wrapper', p1)

print('Updating wrapper:')
print('  assign:', functools.WRAPPER_ASSIGNMENTS)
print('  update:', functools.WRAPPER_UPDATES)
print()

functools.update_wrapper(p1, myfunc)
show_details('updated wrapper', p1)
