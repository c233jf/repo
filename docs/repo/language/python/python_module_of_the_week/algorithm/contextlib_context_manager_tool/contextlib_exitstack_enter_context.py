import contextlib


@contextlib.contextmanager
def make_context(i: int):
    print(f'{i} entering')
    yield {}
    print(f'{i} exiting')


def variable_stack(n, msg: str):
    with contextlib.ExitStack() as stack:
        for i in range(n):
            stack.enter_context(make_context(i))
        print(msg)


variable_stack(2, 'inside context')
