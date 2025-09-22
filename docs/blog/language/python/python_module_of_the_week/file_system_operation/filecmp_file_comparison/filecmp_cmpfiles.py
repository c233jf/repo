import filecmp
import os


# 构建公共文件列表
d1_contents = set(os.listdir('example/dir1'))
d2_contents = set(os.listdir('example/dir2'))
common = list(d1_contents & d2_contents)
common_files = [f for f in common if os.path.isfile(
    os.path.join('example/dir1', f))]
print('Common files:', common_files)

# 比较目录
match, mismatch, errors = filecmp.cmpfiles(
    'example/dir1', 'example/dir2', common_files)
print('Match       :', match)
print('Mismatch    :', mismatch)
print('Errors      :', errors)
