import os
import time
import zipfile

# 1. 将要备份的文件和目录分配到一个列表中
# Windows 例子
# source = ['"C:\\My Documents"']
# Mac OS X 和 Linux 例子:
source = ['/Users/swa/notes']
# 注意如果名字中包含空格我们需要用复数引号
# 或者用 raw 字符串  [r'C:\My Documents'].

# 2. 必须备份到主目录中
# Windows 例子:
# target_dir = 'E:\\Backup'
# Mac OS X 和 Linux 例子:
target_dir = '/Users/swa/backup'
# 记得改成你想放的目录

# 如果目的路径不存在，则创建
if not os.path.exists(target_dir):
    os.mkdir(target_dir)

# 3. 备份文件被打包为一个 zip 文件
# 4. 当前日期是主备份目录下的一个子文件夹
today = target_dir + os.sep + time.strftime('%Y%m%d')
# 当前时间作为备份文件的文件名
now = time.strftime('%H%M%S')

# 让用户输出一个用于创建 zip 文件的名字。
comment = input('Enter a comment --> ')
if len(comment) == 0:
    target = today + os.sep + now + '.zip'
else:
    target = today + os.sep + now + '_' + comment.replace(' ', '_') + '.zip'

# 如果不存在，则创建子文件夹
if not os.path.exists(today):
    os.mkdir(today)
    print('Successfully created directory', today)

# 5. 使用 zipfile 模块创建 zip 文件
with zipfile.ZipFile(target, 'w') as backup_zip:
    for item in source:
        backup_zip.write(item)
