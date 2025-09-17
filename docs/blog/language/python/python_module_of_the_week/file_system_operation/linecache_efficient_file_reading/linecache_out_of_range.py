import linecache
import linecache_data


filename = linecache_data.make_tempfile()

# 缓存总是返回一个字符串，返回一个空的字符串
# 预示这个行不存在。
not_there = linecache.getline(filename, 500)
print('NOT THERE: {!r} includes {} characters'.format(
    not_there, len(not_there)))

linecache_data.cleanup(filename)
