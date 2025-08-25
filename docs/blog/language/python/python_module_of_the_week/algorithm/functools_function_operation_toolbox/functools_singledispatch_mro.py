import functools


class A:
    pass


class B(A):
    pass


class C(A):
    pass


class D(B):
    pass


class E(C, D):
    pass


@functools.singledispatch
def myfunc(arg: object):
    print(f'default myfunc({arg.__class__.__name__})')


@myfunc.register(A)
def myfunc_A(arg: A):
    print(f'myfunc_A({arg.__class__.__name__})')


@myfunc.register(B)
def myfunc_B(arg: B):
    print(f'myfunc_B({arg.__class__.__name__})')


@myfunc.register(C)
def myfunc_C(arg: C):
    print(f'myfunc_C({arg.__class__.__name__})')


myfunc(A())
myfunc(B())
myfunc(C())
myfunc(D())
myfunc(E())
