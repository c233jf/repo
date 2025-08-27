import contextlib


def callback(*args, **kwds):
    print(f'closing callback({args}, {kwds})')


try:
    with contextlib.ExitStack() as stack:
        stack.callback(callback, 'arg1', 'arg2')
        stack.callback(callback, arg3='val3')
        raise RuntimeError('error message')
except RuntimeError as err:
    print('error:', err)
