import contextlib


@contextlib.contextmanager
def make_context():
    print('  entering')
    try:
        # 通过 Yield 控制，但无需返回值，因为作为装饰器
        # 使用时，上下文管理器所返回的值并不会被使用到。
        yield
    except RuntimeError as err:
        print('  ERROR:', err)
    finally:
        print('  exiting')


@make_context()
def normal():
    print('  inside with statement')


@make_context()
def throw_error(err: BaseException):
    raise err


print('Normal:')
normal()

print('\nHandled error:')
throw_error(RuntimeError('showing example of handling an error'))

print('\nUnhandled error:')
throw_error(ValueError('this exception is not handled'))
