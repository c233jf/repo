import functools


@functools.singledispatch
def myfunc(arg):
    print(f'default myfunc({arg!r})')


@myfunc.register(int)
def myfunc_int(arg: int):
    print(f'myfunc_int({arg})')


@myfunc.register(list)
def myfunc_list(arg: list):
    print('myfunc_list()')
    for item in arg:
        print(f'  {item}')


myfunc('string argument')
myfunc(1)
myfunc(2.3)
myfunc(['a', 'b', 'c'])
