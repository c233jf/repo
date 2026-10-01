import functools
from typing import Callable


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


def simple_decorator(f: Callable):
    """简单的装饰器"""
    @functools.wraps(f)
    def decorated(a='decorated defaults', b=1):
        print('  decorated:', (a, b))
        print('  ', end=' ')
        return f(a, b=b)
    return decorated


def myfunc(a: str, b: int = 2):
    """ myfunc() 并不复杂"""
    print('  myfunc:', (a, b))
    return


# 原始函数
show_details('myfunc', myfunc)
myfunc('unwrapped, default b')
myfunc('unwrapped, passing b', 3)
print()

# 显式封装
wrapped_myfunc = simple_decorator(myfunc)
show_details('wrapped_myfunc', wrapped_myfunc)
wrapped_myfunc()
wrapped_myfunc('args to wrapped', 4)
print()

# 用装饰器语法封装


@simple_decorator
def decorated_myfunc(a, b):
    myfunc(a, b)
    return


show_details('decorated_myfunc', decorated_myfunc)
decorated_myfunc()
decorated_myfunc('args to decorated', 4)
