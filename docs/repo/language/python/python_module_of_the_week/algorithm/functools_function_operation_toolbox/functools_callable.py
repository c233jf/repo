import functools
from typing import Callable


class MyClass:
    """Demonstration class for functools"""

    def __call__(self, e: str, f: int = 6):
        """Docstring for MyClass.__call__"""
        print('  called object with:', (self, e, f))


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
    return


o = MyClass()

show_details('instance', o)
o('e goes here')
print()

p = functools.partial(o, e='default for e', f=8)
functools.update_wrapper(p, o)
show_details('instance wrapper', p)
p()
