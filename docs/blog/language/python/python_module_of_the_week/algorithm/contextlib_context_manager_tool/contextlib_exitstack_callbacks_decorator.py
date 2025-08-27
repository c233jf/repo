import contextlib


with contextlib.ExitStack() as stack:

    @stack.callback
    def inline_cleanup():
        print('inline_cleanup()')
        print(f'local_resource = {local_resource!r}')

    local_resource = 'resource created in context'
    print('within the context')
