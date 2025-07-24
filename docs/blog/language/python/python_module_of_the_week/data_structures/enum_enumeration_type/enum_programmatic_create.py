import enum


BugStatus = enum.Enum(value='BugStatus',
                      names=('new incomplete invalid wont_fix in_progress fix_committed fix_released'))


print(f'Member: {BugStatus.new}')


print(f'\nAll members:')
for status in BugStatus:
    print(f'{status.name:15} = {status.value}')
