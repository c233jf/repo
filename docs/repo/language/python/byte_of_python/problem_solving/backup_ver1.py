import os
import time

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

# 3. 文件需要备份到 zip 里。
# 4. zip 的名字需要是当前的日期+时间。
target = target_dir + os.sep +\
    time.strftime('%Y%m%d%H%M%S') + '.zip'

# 如果目录不存在则创建
if not os.path.exists(target_dir):
    os.mkdir(target_dir)

# 5. 我们使用 zip 命令将文件打包成 zip 格式
zip_command = "zip -r {0} {1}".format(target, ' '.join(source))

# 运行备份
print("Zip command is:")
print(zip_command)
print("Running:")
if os.system(zip_command) == 0:
    print("Successful backup to", target)
else:
    print("Backup FAILED")
