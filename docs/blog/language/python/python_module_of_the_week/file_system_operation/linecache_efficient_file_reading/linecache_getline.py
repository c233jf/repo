import linecache
import linecache_data


filename = linecache_data.make_tempfile()


# 从源文件和缓存中挑出相同行
# (注意，linecache 从1开始，数组从0开始)
print('SOURCE:')
print('{!r}'.format(linecache_data.lorem.split('\n')[4]))
print()
print('CACHE:')
print('{!r}'.format(linecache.getline(filename, 5)))

linecache_data.cleanup(filename)
