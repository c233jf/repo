class Context:

    def __init__(self):
        print('__init__()')

    def __enter__(self):
        print('__enter__()')
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print('__exit__()')


with Context() as c:
    print('Doing work in the context')
