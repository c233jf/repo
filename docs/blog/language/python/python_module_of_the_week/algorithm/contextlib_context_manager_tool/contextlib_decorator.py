import contextlib
from types import TracebackType


class Context(contextlib.ContextDecorator):

    def __init__(self, how_used: str):
        self.how_used = how_used
        print('__init__({})'.format(how_used))

    def __enter__(self):
        print('__enter__({})'.format(self.how_used))
        return self

    def __exit__(self, exc_type: type[BaseException] | None, exc_val: BaseException | None, exc_tb: TracebackType | None) -> bool:
        print('__exit__({})'.format(self.how_used))


@Context('as decorator')
def func(message: str):
    print(message)


print()
with Context('as context manager'):
    print('Doing work in the context')

print()
func('Doing work in the wrapped function')
