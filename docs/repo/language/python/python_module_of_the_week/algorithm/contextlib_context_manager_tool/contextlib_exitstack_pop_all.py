import contextlib
from contextlib_context_managers import ErrorOnEnter, HandleError, PassError, Tracker


def variable_stack(contexts: list[Tracker]):
    with contextlib.ExitStack() as stack:
        for c in contexts:
            stack.enter_context(c)
        # 返回新栈的 close() 方法作为清理函数使用。
        return stack.pop_all().close
    # 直接返回 None，表示 ExitStack 没有完成干净的初始化
    # 它的清理过程已经发生。
    return None


print('No errors:')
cleaner = variable_stack([
    HandleError(1),
    HandleError(2),
])
cleaner()

print('\nHandled error building context manager stack:')
try:
    cleaner = variable_stack([
        HandleError(1),
        ErrorOnEnter(2),
    ])
except RuntimeError as err:
    print(f'caught error {err}')
else:
    if cleaner is not None:
        cleaner()
    else:
        print('no cleaner returned')

print('\nUnhandled error building context manager stack:')
try:
    cleaner = variable_stack([
        PassError(1),
        ErrorOnEnter(2),
    ])
except RuntimeError as err:
    print(f'caught error {err}')
else:
    if cleaner is not None:
        cleaner()
    else:
        print('no cleaner returned')
