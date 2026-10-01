import linecache


# 即使如果 linecache 找不到这个文件，错误也会被隐藏
no_such_file = linecache.getline(
    'this_file_does_not_exist.txt', 1,
)
print('NO FILE: {!r}'.format(no_such_file))
