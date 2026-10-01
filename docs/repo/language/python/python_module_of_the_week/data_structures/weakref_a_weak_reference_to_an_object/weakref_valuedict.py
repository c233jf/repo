import gc
import pprint
import weakref


gc.set_debug(gc.DEBUG_UNCOLLECTABLE)


class ExpensiveObject:

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'ExpensiveObject({self.name!r})'

    def __del__(self):
        print(f'(Deleting {self})')


def demo(cache_factory):
    # 持有对象，以便任何弱引用不会被立即删除
    all_refs = {}
    # 使用工厂创建缓存
    cache = cache_factory()
    for name in ['one', 'two', 'three']:
        o = ExpensiveObject(name)
        cache[name] = o
        all_refs[name] = o
        del o  # 引用减少一次

    print('  all_refs =', end=' ')
    pprint.pprint(all_refs)
    print('\n  Before, cache contains:', list(cache.keys()))
    for name, value in cache.items():
        print(f'  {name!r} = {value!r}')
        del value  # 引用减少一次

    # 删掉所有除了缓存的引用
    print('\n  Cleanup:')
    del all_refs
    gc.collect()

    print('\n  After, cache contains:', list(cache.keys()))
    for name, value in cache.items():
        print(f'  {name!r} = {value!r}')
    print('  demo returning')
    return


demo(dict)
print()
demo(weakref.WeakValueDictionary)
