import os
import pathlib
import stat


# 创建一个全新的测试文件
f = pathlib.Path('pathlib_chmod_example.txt')
if f.exists():
    f.unlink()
f.write_text('contents')

# 使用 stat 方法来检测文件权限
existing_permissions = stat.S_IMODE(f.stat().st_mode)
print('Before: {:o}'.format(existing_permissions))

# 决定用啥方法来处理
if not (existing_permissions & os.X_OK):
    print('Adding execute permission')
    new_permissions = existing_permissions | stat.S_IXUSR
else:
    print('Removing execute permission')
    # 使用 xor 来移除用户可执行权限
    new_permissions = existing_permissions ^ stat.S_IXUSR

# 修改权限，并打印修改后的权限结果
f.chmod(new_permissions)
after_permissions = stat.S_IMODE(f.stat().st_mode)
print('After: {:o}'.format(after_permissions))
