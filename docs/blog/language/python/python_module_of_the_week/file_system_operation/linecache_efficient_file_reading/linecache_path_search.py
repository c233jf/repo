import linecache


# 在 sys.path 中查找 linecache 模块
module_line = linecache.getline('linecache.py', 3)
print('MODULE:')
print(repr(module_line))

# 直接查找模块源文件
file_src = linecache.__file__
if file_src.endswith('.pyc'):
    file_src = file_src[:-1]

print('\nFILE:')
with open(file_src, 'r') as f:
    file_line = f.readlines()[2]
print(repr(file_line))
